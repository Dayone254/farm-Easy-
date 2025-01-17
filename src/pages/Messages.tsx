import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { MessageCircle, Phone, Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    location.state?.selectedContact || null
  );
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Load messages and contacts from localStorage on component mount
  useEffect(() => {
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

    // If we have a new contact from navigation state, add them to contacts
    if (location.state?.selectedContact && !contacts.find(c => c.id === location.state.selectedContact.id)) {
      const newContact = location.state.selectedContact;
      setContacts(prev => [...prev, newContact]);
      localStorage.setItem("contacts", JSON.stringify([...contacts, newContact]));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

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
            <h1 className="text-xl font-semibold">Messages</h1>
          )}
        </div>
      </div>

      {selectedContact ? (
        <>
          {/* Chat Messages */}
          <ScrollArea className="h-[calc(100vh-8rem)] px-4">
            <div className="space-y-4 py-4">
              {filteredMessages.map((message) => (
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
                      {new Date(message.timestamp).toLocaleTimeString([], {
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