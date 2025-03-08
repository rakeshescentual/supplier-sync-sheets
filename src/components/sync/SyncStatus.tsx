
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const SyncStatus: React.FC = () => {
  // This data would come from your Gadget.dev API in a real implementation
  const syncData = {
    status: "in-progress", // 'idle', 'in-progress', 'completed', 'failed'
    progress: 65,
    lastSync: "2023-10-05 14:30",
    syncedProducts: 13245,
    totalProducts: 20342,
    estimatedTimeRemaining: "15 minutes",
  };

  const getSyncStatusBadge = () => {
    switch (syncData.status) {
      case "idle":
        return <Badge variant="outline">Idle</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>{syncData.status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Current Sync</h3>
          {getSyncStatusBadge()}
        </div>
        {syncData.status === "in-progress" && (
          <span className="text-sm text-muted-foreground">Est. {syncData.estimatedTimeRemaining} remaining</span>
        )}
      </div>
      
      {syncData.status === "in-progress" && (
        <>
          <Progress value={syncData.progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{syncData.syncedProducts} of {syncData.totalProducts} products</span>
            <span>{syncData.progress}%</span>
          </div>
        </>
      )}
      
      <div className="mt-6 pt-6 border-t grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Last Successful Sync</p>
          <p className="font-medium">{syncData.lastSync}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Webhook Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p className="font-medium">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncStatus;
