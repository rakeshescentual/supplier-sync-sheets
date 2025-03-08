
import React from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewLineFormExcelExportProps {
  supplierName?: string;
  productType?: string;
  onExport?: () => void;
}

const NewLineFormExcelExport: React.FC<NewLineFormExcelExportProps> = ({
  supplierName,
  productType,
  onExport
}) => {
  const { toast } = useToast();
  
  const handleExport = () => {
    if (onExport) {
      onExport();
      return;
    }
    
    toast({
      title: "Generating Excel",
      description: "Preparing Excel sheet for download...",
    });
    
    // In a real implementation, this would generate an Excel file via Gadget.dev
    setTimeout(() => {
      toast({
        title: "Excel Ready",
        description: "Your Excel file is ready to download",
      });
    }, 1500);
  };
  
  const handleTemplateDownload = () => {
    toast({
      title: "Template Downloaded",
      description: `Template for ${productType || 'general'} products downloaded`,
    });
    // This would download a template Excel file
  };
  
  const handleUpload = () => {
    toast({
      title: "Upload Excel",
      description: "Please select an Excel file to upload",
    });
    // In a real implementation, this would open a file dialog
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-md border bg-muted/50">
        <h3 className="text-sm font-medium mb-2">Excel File Management</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Generate, download or upload Excel-based New Line Forms
          {supplierName && ` for ${supplierName}`}
          {productType && ` (${productType} products)`}.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="default" 
            onClick={handleExport}
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Generate Excel Form
          </Button>
          <Button 
            variant="outline" 
            onClick={handleTemplateDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
          <Button 
            variant="outline" 
            onClick={handleUpload}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Filled Form
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewLineFormExcelExport;
