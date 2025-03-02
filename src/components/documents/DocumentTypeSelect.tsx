
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DocumentTypeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const DocumentTypeSelect = ({ value, onValueChange }: DocumentTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="document_type">Belge Türü</Label>
      <Select
        value={value}
        onValueChange={onValueChange}
        required
      >
        <SelectTrigger id="document_type">
          <SelectValue placeholder="Belge türü seçin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="invoice">Fatura</SelectItem>
          <SelectItem value="customs_declaration">Gümrük Beyannamesi</SelectItem>
          <SelectItem value="bill_of_lading">Konşimento</SelectItem>
          <SelectItem value="packing_list">Çeki Listesi</SelectItem>
          <SelectItem value="certificate_of_origin">Menşe Şahadetnamesi</SelectItem>
          <SelectItem value="other">Diğer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DocumentTypeSelect;
