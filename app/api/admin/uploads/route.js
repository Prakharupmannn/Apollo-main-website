import { NextResponse } from "next/server";
import { uploadToBlob, deleteFromBlob, ALLOWED_FOLDERS } from "@/lib/blob";
import { getAdminSession } from "@/lib/auth";
import { handleUpload } from "@vercel/blob/client";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    // 1. Verify admin session
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access. Please log in as an administrator." },
        { status: 401 }
      );
    }

    const contentType = request.headers.get("content-type") || "";

    // 2. Direct client upload token authorization (for large files via @vercel/blob/client)
    if (contentType.includes("application/json")) {
      const body = await request.json();

      const jsonResponse = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async (pathname) => {
          return {
            allowedContentTypes: [
              "image/jpeg",
              "image/png",
              "image/webp",
              "image/gif",
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ],
            maximumSizeInBytes: 25 * 1024 * 1024, // 25 MB
            tokenPayload: JSON.stringify({
              userId: session.id,
              userEmail: session.email,
            }),
          };
        },
        onUploadCompleted: async ({ blob }) => {
          console.log("Client upload completed:", blob.pathname);
        },
      });

      return NextResponse.json(jsonResponse);
    }

    // 3. Standard FormData multipart upload
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "general";
    const isDocument = formData.get("isDocument") === "true";

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "File is required" },
        { status: 400 }
      );
    }

    const uploadedFile = await uploadToBlob(file, {
      folder,
      isDocument,
    });

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      data: uploadedFile,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "File upload failed",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    let url = searchParams.get("url");

    if (!url) {
      try {
        const body = await request.json();
        url = body?.url;
      } catch {
        // ignore json parse error if no body
      }
    }

    if (!url) {
      return NextResponse.json(
        { success: false, message: "File URL is required" },
        { status: 400 }
      );
    }

    await deleteFromBlob(url);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to delete file",
      },
      { status: 500 }
    );
  }
}

