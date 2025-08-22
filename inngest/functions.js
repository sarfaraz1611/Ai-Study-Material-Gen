import { inngest } from "./client";
import { db } from "../configs/db.js";
import {
  CHAPTER_NOTES_TABLE,
  USER_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
} from "../configs/schema.js";
import { eq } from "drizzle-orm";
import {
  generateNotesAiModel,
  GenerateQuizAiModel,
  GenerateStudyTypeContentAiModel,
} from "../configs/AiModel";

export const CreateAccountUser = inngest.createFunction(
  { id: "CreateAccount" },
  { event: "Create-Account" },
  async ({ event, step }) => {
    // get Event Data
    const { user } = event.data;

    const result = await step.run("Check Data exists in DB", async () => {
      const email = user?.primaryEmailAddress?.emailAddress;

      if (!email) {
        throw new Error("User email not found");
      }

      const existingUser = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, email));

      if (existingUser.length === 0) {
        // Create new user
        const newUser = await db.insert(USER_TABLE).values({
          name: user?.fullName || "Unknown",
          email: email,
          isMember: false,
        });
        return newUser;
      }
      return existingUser;
    });

    return "Success";
  }
  //   Step to send email to user
  // step to send email to user  after 3 days
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course", retries: 1 },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data; // All Record Info

    // Generate Notes for Each Chapter with AI
    const notesResult = await step.run("Generate Chapter Notes", async () => {
      const Chapters = course?.courseLayout?.chapters;
      let index = 0;

      for (const chapter of Chapters) {
        try {
          // Create a more concise prompt to avoid length issues
          const chapterContent = JSON.stringify(chapter).substring(0, 4000); // Reduce limit to avoid API limits
          const PROMPT = `Generate ${course?.courseType} material content for this chapter. Include notes for each topic, code examples in <precode> tags, highlight key points, and format in HTML (no HTML/HEAD/BODY tags). Chapter: ${chapterContent}`;

          console.log(
            `Generating notes for chapter ${index}, prompt length: ${PROMPT.length}`
          );
          console.log(
            `Chapter content preview: ${chapterContent.substring(0, 200)}...`
          );

          const result = await generateNotesAiModel(PROMPT);

          if (
            !result.candidates ||
            !result.candidates[0] ||
            !result.candidates[0].content ||
            !result.candidates[0].content.parts ||
            !result.candidates[0].content.parts[0]
          ) {
            throw new Error("Invalid response structure from Gemini API");
          }

          const aiResp = result.candidates[0].content.parts[0].text;

          await db.insert(CHAPTER_NOTES_TABLE).values({
            chapterId: index,
            courseId: course?.courseId,
            notes: aiResp,
          });

          console.log(`Successfully generated notes for chapter ${index}`);
          index = index + 1;
        } catch (error) {
          console.error(`Error generating notes for chapter ${index}:`, error);
          throw error;
        }
      }
      return Chapters;
    });

    // Update Status to 'Ready'
    const updateCourseStatusResult = await step.run(
      "Update Course Status to Ready",
      async () => {
        const result = await db
          .update(STUDY_MATERIAL_TABLE)
          .set({
            status: "Ready",
          })
          .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
        return "Success";
      }
    );
  }
);

// Helper function to clean AI response and extract JSON
const cleanAndParseAIResponse = (text) => {
  try {
    // Remove markdown code blocks if present
    let cleanedText = text.trim();

    // Remove ```json and ``` markers
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "");
    }
    if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "");
    }
    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.replace(/\s*```$/, "");
    }

    // Try to parse as JSON
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error parsing AI response:", error);
    console.error("Raw response:", text);
    throw new Error(`Failed to parse AI response as JSON: ${error.message}`);
  }
};

export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "Generate Study Type Content", retries: 1 },
  { event: "studyType.content" },

  async ({ event, step }) => {
    const { studyType, prompt, courseId, recordId } = event.data;

    const AiResult = await step.run(
      "Generating Flashcard using AI",
      async () => {
        const result =
          studyType == "Flashcard"
            ? await GenerateStudyTypeContentAiModel(prompt)
            : await GenerateQuizAiModel(prompt);
        const rawText = result.candidates[0].content.parts[0].text;
        const AIResult = cleanAndParseAIResponse(rawText);
        return AIResult;
      }
    );

    // Save the Result

    const DbResult = await step.run("Save Result to DB", async () => {
      const result = await db
        .update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          content: AiResult,
          status: "Ready",
        })
        .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));

      return "Data Instered";
    });
  }
);
