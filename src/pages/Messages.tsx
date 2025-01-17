import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { MessageCircle, Phone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

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
      phoneNumber: "+254712345678"
    },
    {
      id: "2",
      name: "Jane Smith",
      userType: "vendor",
      profileImage: null,
      lastMessage: "I'm interested in buying your wheat.",
      lastMessageTime: new Date(),
      phoneNumber: "+254723456789"
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

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContact) return;
    
    // In a real app, this would send the message to a backend
    console.log("Sending message to", selectedContact.name, ":", messageInput);
    
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedContact.name}`,
    });
    
    setMessageInput("");
  };

  const handleCall = (contact: Contact) => {
    // In a real app, this would initiate a call
    window.location.href = `tel:${contact.phoneNumber}`;
    
    toast({
      title: "Initiating Call",
      description: `Calling ${contact.name}...`,
    });
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg h-[80vh] flex">
        {/* Contacts sidebar */}
        <div className="w-1/3 border-r">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="h-[calc(80vh-5rem)]">
            <div className="space-y-2 p-4">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id
                      ? "bg-accent"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={contact.profileImage || undefined} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{contact.name}</p>
                        {contact.lastMessageTime && (
                          <span className="text-xs text-muted-foreground">
                            {contact.lastMessageTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
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
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedContact.profileImage || undefined} />
                    <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedContact.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {selectedContact.userType}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCall(selectedContact)}
                >
                  <Phone className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === userProfile?.id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === userProfile?.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <span className="text-xs opacity-70">
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

              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a contact to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;