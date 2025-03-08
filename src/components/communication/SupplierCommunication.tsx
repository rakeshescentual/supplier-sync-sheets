
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Mail, Upload, Download } from "lucide-react";

interface SupplierCommunicationProps {
  supplierEmail: string;
  brandName: string;
}

const SupplierCommunication: React.FC<SupplierCommunicationProps> = ({
  supplierEmail,
  brandName
}) => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  
  // Mock communication history
  const [communications] = useState([
    { id: "1", date: "2023-10-05", type: "Email", subject: "Initial New Line Form", status: "Sent" },
    { id: "2", date: "2023-10-07", type: "Email", subject: "Form Update", status: "Received" },
    { id: "3", date: "2023-10-10", type: "Email", subject: "Missing Information", status: "Sent" },
  ]);
  
  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a message before sending",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Message Sent",
      description: `Email sent to ${supplierEmail}`,
    });
    
    setMessage("");
    // This would connect to Gadget.dev API to handle the email sending
  };
  
  const handleFileUpload = () => {
    toast({
      title: "Upload Excel",
      description: "Please select an Excel file to upload",
    });
    // In a real implementation, this would open a file dialog
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md border p-4">
        <h3 className="text-sm font-medium mb-2">Send Message to Supplier</h3>
        <div className="mb-3">
          <p className="text-sm text-muted-foreground">
            To: {supplierEmail || "No supplier email specified"}
          </p>
          {brandName && (
            <p className="text-sm text-muted-foreground">
              Re: New Line Form - {brandName}
            </p>
          )}
        </div>
        <Textarea
          placeholder="Type your message to the supplier..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-3 min-h-20"
        />
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleSendMessage} disabled={!supplierEmail}>
            <Mail className="h-4 w-4 mr-2" /> Send Message
          </Button>
          <Button variant="outline" onClick={handleFileUpload}>
            <Upload className="h-4 w-4 mr-2" /> Upload Received Form
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Communication History</h3>
        {communications.length === 0 ? (
          <p className="text-sm text-muted-foreground">No communications yet</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {communications.map((comm) => (
                <TableRow key={comm.id}>
                  <TableCell>{comm.date}</TableCell>
                  <TableCell>{comm.type}</TableCell>
                  <TableCell>{comm.subject}</TableCell>
                  <TableCell>{comm.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default SupplierCommunication;
