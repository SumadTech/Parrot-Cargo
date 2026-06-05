import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function fileToBase64(file: File) {
  return file.arrayBuffer().then((buffer) => {
    const base64 = Buffer.from(buffer).toString("base64");
    return `data:${file.type};base64,${base64}`;
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Image file is required." },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files are allowed." },
        { status: 400 },
      );
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        { message: "Image must be smaller than 5MB." },
        { status: 400 },
      );
    }

    const base64File = await fileToBase64(file);

    const upload = await cloudinary.uploader.upload(base64File, {
      folder: process.env.CLOUDINARY_FOLDER || "parrot-cargo",
      resource_type: "image",
    });

    return NextResponse.json({
      url: upload.secure_url,
      publicId: upload.public_id,
      width: upload.width,
      height: upload.height,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to upload image." },
      { status: 500 },
    );
  }
}