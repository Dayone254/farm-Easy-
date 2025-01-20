import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductOwnerActionsProps {
  onRemove: () => void;
  onMarkAsSold: () => void;
}

const ProductOwnerActions = ({ onRemove, onMarkAsSold }: ProductOwnerActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="destructive"
        className="flex-1"
        onClick={onRemove}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Remove
      </Button>
      <Button
        variant="secondary"
        className="flex-1"
        onClick={onMarkAsSold}
      >
        Mark as Sold
      </Button>
    </div>
  );
};

export default ProductOwnerActions;