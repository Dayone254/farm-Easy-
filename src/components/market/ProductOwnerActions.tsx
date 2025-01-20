import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductOwnerActionsProps {
  onRemove: () => void;
  onMarkAsSold: () => void;
  isLoading: boolean;
}

const ProductOwnerActions = ({ onRemove, onMarkAsSold, isLoading }: ProductOwnerActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="destructive"
        className="flex-1"
        onClick={onRemove}
        disabled={isLoading}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Remove
      </Button>
      <Button
        variant="secondary"
        className="flex-1"
        onClick={onMarkAsSold}
        disabled={isLoading}
      >
        Mark as Sold
      </Button>
    </div>
  );
};

export default ProductOwnerActions;