import { inngest } from "./client";
import { db } from "../configs/db.js";
import { USER_TABLE } from "../configs/schema.js";
import { eq } from "drizzle-orm";

// export const helloWorld = inngest.createFunction(
//   { id: "hello-world" },
//   { event: "test/hello.world" },
//   async ({ event, step }) => {
//     console.log("Hello World function triggered with event:", event);

//     await step.sleep("wait-a-moment", "1s");

//     const message = `Hello ${event.data.email || "World"}!`;
//     console.log("Function completed with message:", message);

//     return { message };
//   }
// );

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
        return newUser

      }
      return existingUser
    });

    return "Success";
  }
  //   Step to send email to user
  // step to send email to user  after 3 days
);
