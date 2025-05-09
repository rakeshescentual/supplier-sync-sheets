
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, MessageCircle, Copy, Check } from "lucide-react";
import { MCPConnectionInfo, queryDevAssistant } from "@/services/shopifyDevAssistantService";
import { useToast } from "@/hooks/use-toast";

interface ShopifyDevAssistantChatProps {
  connectionId: string;
}

interface MessageItem {
  type: 'question' | 'answer';
  content: string;
  timestamp: Date;
  codeSnippets?: string[];
  relevantDocs?: string[];
}

const ShopifyDevAssistantChat: React.FC<ShopifyDevAssistantChatProps> = ({ connectionId }) => {
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleSendQuestion = async () => {
    if (!question.trim()) return;
    
    const newQuestion: MessageItem = {
      type: 'question',
      content: question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newQuestion]);
    setIsLoading(true);
    
    try {
      const response = await queryDevAssistant(connectionId, question);
      
      const newAnswer: MessageItem = {
        type: 'answer',
        content: response.answer,
        timestamp: new Date(),
        codeSnippets: response.codeSnippets,
        relevantDocs: response.relevantDocs
      };
      
      setMessages(prev => [...prev, newAnswer]);
    } catch (error) {
      console.error("Error querying Dev Assistant:", error);
      toast({
        title: "Error",
        description: "Failed to get a response from the Dev Assistant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setQuestion("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedSnippet(text);
        setTimeout(() => setCopiedSnippet(null), 2000);
        toast({
          title: "Copied to clipboard",
          description: "Code snippet copied successfully",
        });
      })
      .catch(err => {
        console.error("Failed to copy:", err);
        toast({
          title: "Copy failed",
          description: "Failed to copy code to clipboard",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Ask the Shopify Dev Assistant a question to get started</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.type === 'question' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-3/4 rounded-lg p-3 ${
                  msg.type === 'question' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                
                {msg.codeSnippets && msg.codeSnippets.map((snippet, snipIdx) => (
                  <div key={snipIdx} className="mt-2 relative">
                    <pre className="bg-gray-800 text-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                      {snippet}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(snippet)}
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                    >
                      {copiedSnippet === snippet ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 text-gray-300" />
                      )}
                    </Button>
                  </div>
                ))}
                
                {msg.relevantDocs && msg.relevantDocs.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium mb-1">Relevant Documentation:</p>
                    <ul className="text-xs space-y-1">
                      {msg.relevantDocs.map((doc, docIdx) => (
                        <li key={docIdx}>
                          <a 
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline"
                          >
                            {doc}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <p className="text-xs opacity-75 mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-center py-4">
            <Loader className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        )}
      </div>
      
      <CardFooter className="border-t p-4">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Ask about Shopify development..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendQuestion()}
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendQuestion} 
            disabled={isLoading || !question.trim()}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </div>
  );
};

export default ShopifyDevAssistantChat;
