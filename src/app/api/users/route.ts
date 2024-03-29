import { User, UserType } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const connectionString = process.env.MONGO_URI;
  if (!connectionString) {
    return new Response("no db connection string", { status: 500 });
  }

  await mongoose.connect(connectionString);

  let users = [];

  if (url.searchParams.get("ids")) {
    const emails = url.searchParams.get("ids")?.split(",");
    users = await User.find({ email: { $in: emails } });
  }

  if (url.toString().includes("?search=")) {
    const searchPhrase = url.searchParams.get("search");
    const searchRegex = `.*${searchPhrase}.*`;
    users = await User.find({
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ],
    });
  }

  return Response.json(
    users.map((user: UserType) => ({
      id: user.email,
      name: user.name,
      image: user.image,
      avatar: user.image,
    }))
  );
}
