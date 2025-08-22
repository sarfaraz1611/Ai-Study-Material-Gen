import { courseOutlineAIModel } from "../../../configs/AiModel";
import { db } from "../../../configs/db";
import { STUDY_MATERIAL_TABLE } from "../../../configs/schema";
import { inngest } from "../../../inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { courseId, topic, courseType, difficultyLevel, createdBy } =
      await req.json();

    const PROMPT = ` Generate a study material for {topic} for {courseType} and the level of difficulty will be {difficultyLevel}.  
    The output must be in **JSON format** and follow exactly this structure:
    
    {
      "courseTitle": string,
      "courseSummary": string,
      "difficulty": string,
      "chapters": [
        {
          "chapterNumber": number,
          "chapterTitle": string (must include an emoji),
          "chapterSummary": string,
          "topics": [
            string,
            string,
            ...
          ]
        },
        ...
      ]
    }
    
    Rules:
    1. Output must be a single JSON object, not an array.
    2. courseTitle should be the full descriptive name of the course.
    3. courseSummary should be 2–4 sentences summarizing the course.
    4. chapterSummary should be 1–2 sentences summarizing that chapter.
    5. topics should be an array of detailed topic names (strings only, no numbers).
    6. Maintain the exact property names and nesting as shown in the structure above.`;

    // Generate Course Layout using AI
    const aiResp = await courseOutlineAIModel(PROMPT);

    // Extract the text content from the response
    let aiText = aiResp?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      console.error("Unexpected Gemini API response structure:", aiResp);
      throw new Error("Invalid response from Gemini API");
    }

    // Remove markdown code block fences if they exist
    aiText = aiText.replace(/```json|```/g, "").trim();

    // Parse the JSON response
    const aiResult = JSON.parse(aiText);

    // Save the result along with User Input
    const dbResult = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId: courseId,
        courseType: courseType,
        createdBy: createdBy,
        topic: topic,
        courseLayout: aiResult,
      })
      .returning({ resp: STUDY_MATERIAL_TABLE });

    //Trigger the Inngest function to generate chapter notes
    inngest.send({
      name: "notes.generate",
      data: {
        course: dbResult[0].resp,
      },
    });

    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("Error in generate-course API:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
