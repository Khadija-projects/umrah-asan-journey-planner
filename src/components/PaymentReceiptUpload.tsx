import { useState, useRef } from "react";
import { Upload, FileText, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PaymentReceiptUploadProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  bookingReference: string;
}

const PaymentReceiptUpload = ({ isOpen, onClose, bookingId, bookingReference }: PaymentReceiptUploadProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploaded' | 'pending'>('idle');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image (JPEG, PNG, GIF) or PDF file.",
          variant: "destructive"
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      setUploadedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;

    setUploading(true);
    try {
      // Here you would typically upload to Supabase Storage
      // For demo purposes, we'll simulate the upload and update the booking
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update booking with receipt uploaded status
      const { error } = await supabase
        .from('bookings')
        .update({
          booking_status: 'pending',
          receipt_uploaded_at: new Date().toISOString(),
          payment_receipt_url: `receipts/${bookingId}_${uploadedFile.name}`
        })
        .eq('id', bookingId);

      if (error) throw error;

      setUploadStatus('pending');
      
      toast({
        title: "Receipt Uploaded Successfully",
        description: "Your payment receipt has been uploaded. Admin will verify and update your booking status.",
      });
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload receipt. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Upload Payment Receipt</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Booking Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-mono font-bold text-center text-lg">{bookingReference}</p>
            </CardContent>
          </Card>

          {uploadStatus === 'idle' && (
            <>
              <div className="text-center">
                <div 
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload your payment receipt
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported: JPG, PNG, GIF, PDF (Max 5MB)
                  </p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {uploadedFile && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">{uploadedFile.name}</p>
                        <p className="text-xs text-green-600">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpload}
                  disabled={!uploadedFile || uploading}
                  className="min-w-24"
                >
                  {uploading ? "Uploading..." : "Upload Receipt"}
                </Button>
              </div>
            </>
          )}

          {uploadStatus === 'pending' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Receipt Under Review</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your payment receipt has been uploaded successfully. Our admin team will verify the payment and update your booking status within 24 hours.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-700">
                    You will receive a final voucher via email once payment is verified.
                  </p>
                </div>
              </div>
              <Button onClick={handleClose}>
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentReceiptUpload;