import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  CreateAccountUser,
  GenerateNotes,
  GenerateStudyTypeContent,
} from "../../../inngest/functions";

// Create an API that serves Inngest functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  streaming: "force",
  functions: [CreateAccountUser, GenerateNotes, GenerateStudyTypeContent],
});
