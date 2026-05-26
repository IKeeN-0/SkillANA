import { createUploadthing, type FileRouter } from "uploadthing/server";
import jwt from "jsonwebtoken"
import { createRouteHandler } from "uploadthing/next";

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
      
      console.log("Upload completed for userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl);

      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});