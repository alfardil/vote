import { db } from "@/firebase"; // Adjust path to Firebase config
import { setDoc, doc } from "firebase/firestore";

// Define the handler function for POST requests
export async function POST(request) {
  try {
    const body = await request.json(); // Parse the incoming JSON request
    const { vote, userId, email } = body;

    // Input validation
    if (!vote || !userId || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Overwrite the vote or create a new document if it doesn't exist
    await setDoc(
      doc(db, "votes", userId),
      {
        vote,
        email,
      },
      { merge: true }
    ); // This will update the vote while preserving other fields

    // Return a success response
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error submitting vote:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
