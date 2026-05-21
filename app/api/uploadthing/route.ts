import { createUploadthing, type FileRouter } from "uploadthing/server";
import jwt from "jsonwebtoken"
import { createRouteHandler } from "uploadthing/next";
import { User } from "@/lib/models/schema";
import dbConnect from "@/lib/db";

const f = createUploadthing();

export const uploadRouter = {
  profileImg: f({
    image: { maxFileSize: "4MB" },
  })
    .middleware(async ({ req }) => {
     try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) throw new Error("No token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    console.log("Decoded ID:", decoded.id);
    return { userId: decoded.id };

  } catch (err) {
    console.error("JWT ERROR:", err);
    throw new Error("Unauthorized");
  }
    })
    .onUploadComplete(async ({ metadata, file }) => {
  try {
    await dbConnect();

    console.log("UserId:", metadata.userId);
    console.log("Type:", typeof metadata.userId);
    console.log("File URL:", file.ufsUrl);

    const updatedUser = await User.findByIdAndUpdate(
      metadata.userId,
      { profileImg: file.ufsUrl },
      { new: true }
    );

    console.log("Updated User:", updatedUser);

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return { uploadedBy: metadata.userId };

  } catch (error) {
    console.error("ERROR IN ONUPLOADCOMPLETE:", error);
    throw new Error("Failed to update database");
  }
}),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});