"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";
import config from "@/lib/config";
import { FilePath } from "tailwindcss/types/config";
import { toast } from "@/hooks/use-toast";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;
if (!publicKey || !urlEndpoint) {
  throw new Error("Missing ImageKit API credentials in environment variables.");
}

// const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  //   const [file, setFile] = useState<{ filePath: string } | null>(null);
  //   const [file, setFile] = useState<{ filePath: string }>({ filePath: "" });
  const [file, setFile] = useState<{ filePath: string }>({ filePath: "" });

  const onError = () => {
    console.log(error);
    toast({
      title: "Image uploaded failed",
      description: "Your image could not be uploaded. Please try again.",
      variant: "destructive",
    });
  };
  //   const onSuccess = (res: any) => {
  //     setFile(res);
  //     onFileChange(res.filePath);

  //     toast({
  //       title: "Image uploaded successfully",
  //       description: `${res.filePath} uploaded successfully`,
  //     });
  //   };
  const onSuccess = (res: any) => {
    if (!res?.filePath) return; // 确保 res 有 filePath
    setFile({ filePath: res.filePath }); // ✅ 保证 `filePath` 是字符串
    onFileChange(res.filePath);
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>

        {file && (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={500}
          />
        )}
      </button>
    </ImageKitProvider>
  );
};

export default ImageUpload;
