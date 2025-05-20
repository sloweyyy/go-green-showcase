import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET handler to retrieve all comments
export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db("go-green");

		const comments = await db
			.collection("comments")
			.find({})
			.sort({ createdAt: -1 })
			.toArray();

		return NextResponse.json({ comments });
	} catch (error) {
		console.error("Database connection failed:", error);
		return NextResponse.json(
			{ error: "Failed to fetch comments" },
			{ status: 500 }
		);
	}
}

// POST handler to add a new comment
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, division, message } = body;

		// Validate required fields
		if (!name || !division || !message) {
			return NextResponse.json(
				{ error: "Name, division, and message are required" },
				{ status: 400 }
			);
		}

		const client = await clientPromise;
		const db = client.db("go-green");

		// Create the comment with current timestamp
		const comment = {
			name,
			division,
			message,
			createdAt: new Date(),
		};

		const result = await db.collection("comments").insertOne(comment);

		return NextResponse.json(
			{
				message: "Comment submitted successfully",
				commentId: result.insertedId,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error submitting comment:", error);
		return NextResponse.json(
			{ error: "Failed to submit comment" },
			{ status: 500 }
		);
	}
}
