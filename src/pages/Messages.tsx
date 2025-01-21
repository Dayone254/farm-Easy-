import { useState, useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import { MessageCircle, Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMessages, sendMessage, markMessageAsRead } from "@/utils/messagesApi";
import { formatDistanceToNow } from "date-fns";
import { Contact, Message } from "@/types/messages";

const Messages = () => {
  const { userProfile } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch messages
  const { data: messages = [] } = useQuery({
    queryKey: ['messages', userProfile?.id],
    queryFn: () => fetchMessages(userProfile?.id || ''),
    enabled: !!userProfile?.id,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!userProfile?.id || !selectedContact?.id) {
        throw new Error("Missing user information");
      }
      return await sendMessage(userProfile.id, selectedContact.id, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setMessageInput("");
      toast({
        description: "Message sent successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to send message",
      });
    },
  });

  // Mark message as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: string) => {
      await markMessageAsRead(messageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter messages for selected contact
  const filteredMessages = messages.filter(
    (message: Message) =>
      selectedContact &&
      ((message.senderId === userProfile?.id && message.receiverId === selectedContact.id) ||
        (message.receiverId === userProfile?.id && message.senderId === selectedContact.id))
  );

  // Get unique contacts from messages
  const contacts = Array.from(
    new Set(
      messages
        .map((message: Message) =>
          message.senderId === userProfile?.id
            ? message.receiverId
            : message.senderId
        )
    )
  );

  // Filter contacts based on search
  const filteredContacts = contacts.filter((contactId) =>
    contacts.some((contact) =>
      contact.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    sendMessageMutation.mutate(messageInput);
  };

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
                <span className="font-semibold">{selectedContact.name}</span>
              </div>
              <div className="w-10" /> {/* Spacer for alignment */}
            </>
          ) : (
            <h1 className="text-xl font-semibold">Messages</h1>
          )}
        </div>
      </div>

      {selectedContact ? (
        <>
          {/* Chat Messages */}
          <ScrollArea className="h-[calc(100vh-16rem)] px-4">
            <div className="space-y-4 py-4">
              {filteredMessages.map((message: Message) => {
                const isCurrentUser = message.senderId === userProfile?.id;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl p-3 ${
                        isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="break-words">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {formatDistanceToNow(new Date(message.timestamp))} ago
                      </span>
                    </div>
                  </div>
                );
              })}
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
              {filteredContacts.map((contactId) => (
                <div
                  key={contactId}
                  className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer"
                  onClick={() => setSelectedContact({ id: contactId, name: contactId })}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{contactId[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{contactId}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {messages
                        .filter(
                          (m: Message) =>
                            m.senderId === contactId || m.receiverId === contactId
                        )
                        .slice(-1)[0]?.content || "No messages yet"}
                    </p>
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
