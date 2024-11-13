import { useState } from "react";
import { HelpCircle, X } from "lucide-react";
import { Button } from "./ui/button";

const AIHelper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-6 right-6 rounded-full bg-[#2F5233] text-white shadow-lg hover:bg-[#1F371F]"
        onClick={() => setIsOpen(true)}
      >
        <HelpCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-xl p-4 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">AI Assistant</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">How can I help you today?</p>
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full p-2 border rounded-md"
            />
            <Button className="w-full bg-[#2F5233] hover:bg-[#1F371F]">
              Ask AI
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIHelper;