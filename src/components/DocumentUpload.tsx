import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, File, X } from "lucide-react";

interface UploadedDocument {
  id: string;
  name: string;
  lender: string;
  type: string;
}

const DocumentUpload = () => {
  const { toast } = useToast();
  const [selectedLender, setSelectedLender] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!selectedLender || !documentType) {
      toast({
        title: "Error",
        description: "Please select a lender and document type first",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would upload this to a server
    const newDoc: UploadedDocument = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      lender: selectedLender,
      type: documentType,
    };

    setUploadedDocs([...uploadedDocs, newDoc]);
    toast({
      title: "Success",
      description: "Document uploaded successfully",
    });
  };

  const removeDocument = (id: string) => {
    setUploadedDocs(uploadedDocs.filter(doc => doc.id !== id));
    toast({
      title: "Success",
      description: "Document removed successfully",
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Document Upload</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={selectedLender} onValueChange={setSelectedLender}>
            <SelectTrigger>
              <SelectValue placeholder="Select Lender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kcb">KCB Bank</SelectItem>
              <SelectItem value="equity">Equity Bank</SelectItem>
              <SelectItem value="afc">AFC</SelectItem>
            </SelectContent>
          </Select>

          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger>
              <SelectValue placeholder="Document Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">ID Document</SelectItem>
              <SelectItem value="bank_statements">Bank Statements</SelectItem>
              <SelectItem value="business_registration">Business Registration</SelectItem>
              <SelectItem value="sales_records">Sales Records</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <Button
            onClick={() => document.getElementById('file-upload')?.click()}
            className="w-full md:w-auto flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </div>

        {uploadedDocs.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Uploaded Documents</h4>
            <div className="space-y-2">
              {uploadedDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-background rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <File className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        {doc.lender} - {doc.type.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDocument(doc.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DocumentUpload;