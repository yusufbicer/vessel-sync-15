
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Shipment {
  id: string;
  order_number: string;
}

interface ShipmentSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  shipments: Shipment[];
}

const ShipmentSelect = ({ value, onValueChange, shipments }: ShipmentSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="shipment_id">İlgili Sevkiyat (Opsiyonel)</Label>
      <Select
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger id="shipment_id">
          <SelectValue placeholder="Bir sevkiyat seçin (opsiyonel)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">İlişkilendirme Yok</SelectItem>
          {shipments.map((shipment) => (
            <SelectItem key={shipment.id} value={shipment.id}>
              {shipment.order_number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ShipmentSelect;
