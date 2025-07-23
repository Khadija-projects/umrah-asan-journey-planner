import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ImageUpload({ label, value, onChange, placeholder }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);

      // Upload to a service like Imgur, Cloudinary, or your own file upload endpoint
      // For now, we'll create a local URL and suggest users to upload manually
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // For demo purposes, we'll just show the local file URL
        // In production, you'd upload to a cloud service
        onChange(result);
        toast.success("Image loaded locally. Please upload to a public URL for production use.");
      };
      reader.readAsDataURL(file);

    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`image-${label}`}>{label}</Label>
      
      {/* URL Input */}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Enter image URL or upload file"}
        />
        {value && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => window.open(value, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* File Upload */}
      <div className="flex items-center gap-2">
        <Input
          id={`image-${label}`}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => document.getElementById(`image-${label}`)?.click()}
          disabled={uploading}
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? "Uploading..." : "Upload File"}
        </Button>
        
        {value && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Image Preview */}
      {value && (
        <Card className="w-full max-w-xs">
          <CardContent className="p-2">
            <img
              src={value}
              alt="Preview"
              className="w-full h-32 object-cover rounded"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        Recommended: Upload images to a public cloud service like Imgur, Cloudinary, or your own CDN for production use.
      </p>
    </div>
  );
}