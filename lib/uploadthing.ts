import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  cvUploader: f({ pdf: { maxFileSize: "8MB" } })
    .middleware(async () => ({
      authorized: true,
    }))
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;