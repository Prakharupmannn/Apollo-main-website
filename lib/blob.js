import { put, del } from "@vercel/blob";

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const ALLOWED_ALL_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  ...ALLOWED_DOCUMENT_TYPES,
];

export const ALLOWED_FOLDERS = [
  "doctors",
  "case-studies",
  "events",
  "banners",
  "health-library",
  "specialties",
  "resumes",
  "general",
];

const MIME_EXTENSION_MAP = {
  "image/jpeg": ["jpg", "jpeg"],
  "image/png": ["png"],
  "image/webp": ["webp"],
  "image/gif": ["gif"],
  "application/pdf": ["pdf"],
  "application/msword": ["doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"],
};

/**
 * Check if a URL points to a Vercel Blob resource
 */
export function isBlobUrl(url) {
  if (typeof url !== "string") return false;
  return (
    url.includes(".blob.vercel-storage.com") ||
    url.includes(".public.blob.vercel-storage.com")
  );
}

/**
 * Normalize and sanitize folder name
 */
export function sanitizeFolder(folder = "general") {
  const clean = String(folder || "").trim().toLowerCase();
  if (ALLOWED_FOLDERS.includes(clean)) return clean;
  return "general";
}

/**
 * Upload a file/buffer to Vercel Blob Storage
 */
export async function uploadToBlob(file, options = {}) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token && process.env.NODE_ENV === "development") {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is missing. Please add your Vercel Blob Read/Write token to .env.local to enable uploads locally."
    );
  }

  if (!file) {
    throw new Error("No file provided for upload.");
  }

  const folder = sanitizeFolder(options.folder || "general");
  const access = options.access === "private" ? "private" : "public";

  // Determine file properties
  const originalName = String(options.filename || file.name || "upload").trim();
  const rawType = String(options.contentType || file.type || "").trim().toLowerCase();
  const size = typeof file.size === "number" ? file.size : (file.length || 0);

  if (size === 0) {
    throw new Error("Cannot upload an empty file.");
  }

  // Determine allowed types
  const allowedTypes = options.allowedTypes || (
    folder === "resumes"
      ? ALLOWED_ALL_TYPES
      : folder === "health-library" && options.isDocument
      ? ALLOWED_DOCUMENT_TYPES
      : ALLOWED_ALL_TYPES
  );

  // Validate MIME type
  let detectedType = rawType;
  const rawExt = originalName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";

  // If MIME type missing, infer from safe extension
  if (!detectedType && rawExt) {
    for (const [mime, exts] of Object.entries(MIME_EXTENSION_MAP)) {
      if (exts.includes(rawExt)) {
        detectedType = mime;
        break;
      }
    }
  }

  if (detectedType && !allowedTypes.includes(detectedType)) {
    throw new Error(
      `Unsupported file format: ${detectedType}. Allowed formats: ${allowedTypes.join(", ")}`
    );
  }

  // Validate size (default: 15MB for documents, 10MB for images, custom via options.maxSize)
  const isDoc = ALLOWED_DOCUMENT_TYPES.includes(detectedType) || rawExt === "pdf" || rawExt === "doc" || rawExt === "docx";
  const defaultMaxSize = isDoc ? 15 * 1024 * 1024 : 10 * 1024 * 1024;
  const maxSize = options.maxSize || defaultMaxSize;

  if (size > maxSize) {
    const maxMb = Math.round(maxSize / (1024 * 1024));
    throw new Error(`File size exceeds the limit of ${maxMb} MB.`);
  }

  // Safe unique filename: folder/YYYY-MM/timestamp-uuid.ext
  const safeExt = rawExt || (MIME_EXTENSION_MAP[detectedType] ? MIME_EXTENSION_MAP[detectedType][0] : "bin");
  const uniqueId = crypto.randomUUID().slice(0, 12);
  const now = new Date();
  const datePrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const blobPathname = `${folder}/${datePrefix}/${Date.now()}-${uniqueId}.${safeExt}`;

  // Execute put
  const blob = await put(blobPathname, file, {
    access,
    addRandomSuffix: true,
    contentType: detectedType || undefined,
  });

  return {
    url: blob.url,
    downloadUrl: blob.downloadUrl || blob.url,
    pathname: blob.pathname,
    filename: originalName,
    contentType: detectedType || blob.contentType,
    size,
    uploadedAt: new Date().toISOString(),
  };
}

/**
 * Safely delete a file from Vercel Blob Storage
 */
export async function deleteFromBlob(url) {
  if (!url || !isBlobUrl(url)) {
    return; // Do nothing if it's not a Vercel Blob URL (e.g. /images/... or external CDN)
  }

  try {
    await del(url);
  } catch (error) {
    // Log warning without breaking the caller
    console.warn("Failed to delete blob:", url, error?.message || error);
  }
}
