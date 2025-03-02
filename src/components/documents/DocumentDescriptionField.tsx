
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DocumentDescriptionFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DocumentDescriptionField = ({ value, onChange }: DocumentDescriptionFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="description">Açıklama</Label>
      <Textarea
        id="description"
        name="description"
        placeholder="Belge hakkında açıklama"
        rows={3}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DocumentDescriptionField;
