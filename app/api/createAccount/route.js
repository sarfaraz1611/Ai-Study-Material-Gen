import { NextResponse } from "next/server";
import { inngest } from "../../../inngest/client.js";

export async function POST(request) {
  try {
    const { user } = await request.json();
    
    const result = await inngest.send({
      name: "Create-Account",
      data: {
        user: user,
      },
    });

    return NextResponse.json({ result: result });
  } catch (error) {
    console.error("Error in user API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
