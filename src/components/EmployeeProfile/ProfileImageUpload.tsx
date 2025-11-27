import { Label } from "@radix-ui/react-label";
import { useState, useEffect } from "react";

interface ImageUploadProps {
  onFileSelect?: (file: File | null) => void;
  initialPreview?: string | null;
}

export function ImageUpload({ onFileSelect, initialPreview = null }: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialPreview);
    const DEFAULT_AVATAR = "/images/default-avatar.png";

  useEffect(() => {
    setPreview(initialPreview);
  }, [initialPreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);

    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(DEFAULT_AVATAR);  
    }

    if (onFileSelect) onFileSelect(f);
  };

  return (
    <div className="space-y-1">
      <Label>Profile Image</Label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm border border-gray-300 rounded-md p-2"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 mt-3 rounded-md object-cover border"
        />
      )}
    </div>
  );
}
