import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { MessageCircle, Phone, Search, ArrowLeft, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

interface Contact {
  id: string;
  name: string;
  userType: string;
  profileImage: string | null;
  lastMessage?: string;
  lastMessageTime?: Date;
  phoneNumber: string;
  status?: string;
}

const Messages = () => {
  const { userProfile } = useUser();
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for demonstration
  const contacts: Contact[] = [
    {
      id: "1",
      name: "John Doe",
      userType: "farmer",
      profileImage: null,
      lastMessage: "Hello, is the maize still available?",
      lastMessageTime: new Date(),
      phoneNumber: "+254712345678",
      status: "Active now"
    },
    {
      id: "2",
      name: "Jane Smith",
      userType: "vendor",
      profileImage: null,
      lastMessage: "I'm interested in buying your wheat.",
      lastMessageTime: new Date(),
      phoneNumber: "+254723456789",
      status: "6w"
    }
  ];

  const [messages] = useState<Message[]>([
    {
      id: "1",
      senderId: "1",
      receiverId: userProfile?.id || "",
      content: "Hello, is the maize still available?",
      timestamp: new Date()
    },
    {
      id: "2",
      senderId: userProfile?.id || "",
      receiverId: "1",
      content: "Yes, it is! Would you like to make an offer?",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContact) return;
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedContact.name}`,
    });
    setMessageInput("");
  };

  const handleCall = (contact: Contact) => {
    window.location.href = `tel:${contact.phoneNumber}`;
    toast({
      title: "Initiating Call",
      description: `Calling ${contact.name}...`,
    });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b p-4">
        <div className="flex items-center justify-between">
          {selectedContact ? (
            <>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSelectedContact(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedContact.profileImage || undefined} />
                  <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-semibold">{selectedContact.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedContact.status}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCall(selectedContact)}
              >
                <Phone className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold">Messages</h1>
              <Button variant="ghost" size="icon">
                <Camera className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {selectedContact ? (
        <>
          {/* Chat Messages */}
          <ScrollArea className="h-[calc(100vh-8rem)] px-4">
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.senderId === userProfile?.id ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl p-3",
                      message.senderId === userProfile?.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-100"
                    )}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="sticky bottom-0 bg-white border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="rounded-full"
              />
              <Button 
                onClick={handleSendMessage}
                className="rounded-full"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-9 bg-gray-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Contacts List */}
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-2 p-4">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => setSelectedContact(contact)}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={contact.profileImage || undefined} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{contact.name}</p>
                      {contact.lastMessageTime && (
                        <span className="text-xs text-muted-foreground">
                          {contact.status}
                        </span>
                      )}
                    </div>
                    {contact.lastMessage && (
                      <p className="text-sm text-muted-foreground truncate">
                        {contact.lastMessage}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};

export default Messages;