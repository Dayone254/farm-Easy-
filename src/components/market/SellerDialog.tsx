import { UserCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface SellerDialogProps {
  seller: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SellerDialog = ({ seller, open, onOpenChange }: SellerDialogProps) => {
  if (!seller) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Seller Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={seller.profileImage} />
              <AvatarFallback>{seller.name?.[0] || '?'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                {seller.name}
                {seller.isVerified && (
                  <Badge variant="secondary">
                    <UserCheck className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </h3>
              <p className="text-sm text-muted-foreground">
                {seller.location} • Joined {seller.joinedDate}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Previous Sales</h4>
            {seller.previousSales && seller.previousSales.length > 0 ? (
              <div className="space-y-2">
                {seller.previousSales.map((sale: any, index: number) => (
                  <div key={index} className="flex items-center justify-between text-sm p-2 bg-secondary/20 rounded">
                    <span>{sale.item}</span>
                    <div className="flex items-center gap-2">
                      <span>⭐ {sale.rating}</span>
                      <span className="text-muted-foreground">{sale.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No previous sales</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellerDialog;