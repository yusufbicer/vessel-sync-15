
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DocumentFileUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
}

const DocumentFileUpload = ({ onChange, file }: DocumentFileUploadProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="file">Dosya</Label>
      <div className="border border-input rounded-md p-4">
        <Input
          id="file"
          type="file"
          onChange={onChange}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          required
          className="mb-2"
        />
        <p className="text-xs text-muted-foreground">
          Maksimum dosya boyutu: 10MB. Desteklenen formatlar: PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG
        </p>
      </div>
      {file && (
        <p className="text-sm text-muted-foreground mt-2">
          Seçilen dosya: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}
    </div>
  );
};

export default DocumentFileUpload;
