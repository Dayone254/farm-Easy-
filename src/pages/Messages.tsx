import { useState, useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import { MessageCircle, Phone, Search, ArrowLeft, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";

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

interface ProductInfo {
  id: string | number;
  name: string;
  price: number;
  image: string;
}

const Messages = () => {
  const { userProfile } = useUser();
  const { toast } = useToast();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Initialize states from location and localStorage
  useEffect(() => {
    // Load messages and contacts from localStorage
    const savedMessages = localStorage.getItem("messages");
    const savedContacts = localStorage.getItem("contacts");
    
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      setMessages(parsedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    }
    
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      setContacts(parsedContacts);
    }

    // Handle location state for new contact and product info
    if (location.state?.selectedContact) {
      const newContact = location.state.selectedContact;
      setSelectedContact(newContact);
      
      // Only add to contacts if not already present
      if (!contacts.find(c => c.id === newContact.id)) {
        setContacts(prev => [...prev, newContact]);
      }

      // Set product info if available
      if (location.state.productInfo) {
        setProductInfo(location.state.productInfo);
        setMessageInput(`Hi, I'm interested in your ${location.state.productInfo.name} listed for ${formatCurrency(location.state.productInfo.price)}. Is it still available?`);
      }
    }
  }, [location.state]); // Only run when location.state changes

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContact || !userProfile) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: userProfile.id,
      receiverId: selectedContact.id,
      content: messageInput.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Update contact's last message
    const updatedContacts = contacts.map(contact => {
      if (contact.id === selectedContact.id) {
        return {
          ...contact,
          lastMessage: messageInput.trim(),
          lastMessageTime: new Date(),
        };
      }
      return contact;
    });
    setContacts(updatedContacts);

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

  const filteredMessages = messages.filter(message =>
    selectedContact && (
      (message.senderId === userProfile?.id && message.receiverId === selectedContact.id) ||
      (message.receiverId === userProfile?.id && message.senderId === selectedContact.id)
    )
  );

  const isCurrentUser = (senderId: string) => userProfile?.id === senderId;

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen relative">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white border-b p-4">
        <div className="flex items-center justify-between">
          {selectedContact ? (
            <>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setSelectedContact(null);
                  setProductInfo(null);
                }}
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
            <h1 className="text-xl font-semibold">Messages</h1>
          )}
        </div>
      </div>

      {selectedContact ? (
        <>
          {/* Product Info Card (if available) */}
          {productInfo && (
            <Card className="mx-4 mt-4 p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img 
                    src={productInfo.image} 
                    alt={productInfo.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{productInfo.name}</h3>
                  <p className="text-primary font-medium">{formatCurrency(productInfo.price)}</p>
                </div>
                <ShoppingBag className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          )}

          {/* Chat Messages */}
          <ScrollArea className="h-[calc(100vh-16rem)] px-4">
            <div className="space-y-4 py-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    isCurrentUser(message.senderId) ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl p-3",
                      isCurrentUser(message.senderId)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="break-words">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="sticky bottom-0 bg-white border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="rounded-full"
              />
              <Button 
                onClick={handleSendMessage}
                size="icon"
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
                className="pl-9"
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
                  className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer"
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
                          {new Date(contact.lastMessageTime).toLocaleTimeString([], {
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
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};

export default Messages;