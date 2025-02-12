import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

if (!publicKey || !privateKey || !urlEndpoint) {
  throw new Error("Missing ImageKit API credentials in environment variables.");
}

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
