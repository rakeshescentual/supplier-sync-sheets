
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Clock, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for performance metrics
const syncHistory = [
  { date: '2023-10-01', duration: 45, products: 254, status: 'success' },
  { date: '2023-10-08', duration: 62, products: 312, status: 'success' },
  { date: '2023-10-15', duration: 38, products: 198, status: 'success' },
  { date: '2023-10-22', duration: 84, products: 421, status: 'warning' },
  { date: '2023-10-29', duration: 51, products: 267, status: 'success' },
  { date: '2023-11-05', duration: 43, products: 289, status: 'success' },
  { date: '2023-11-12', duration: 67, products: 342, status: 'success' },
  { date: '2023-11-19', duration: 72, products: 318, status: 'error' },
  { date: '2023-11-26', duration: 37, products: 203, status: 'success' },
  { date: '2023-12-03', duration: 49, products: 287, status: 'success' },
];

const apiUsage = [
  { date: '2023-12-01', requests: 1245, credits: 62 },
  { date: '2023-12-02', requests: 1362, credits: 68 },
  { date: '2023-12-03', requests: 982, credits: 49 },
  { date: '2023-12-04', requests: 1524, credits: 76 },
  { date: '2023-12-05', requests: 1123, credits: 56 },
  { date: '2023-12-06', requests: 1287, credits: 64 },
  { date: '2023-12-07', requests: 1451, credits: 73 },
];

const errorRates = [
  { category: 'Product Creation', success: 98.2, warning: 1.3, error: 0.5 },
  { category: 'Product Update', success: 97.6, warning: 1.8, error: 0.6 },
  { category: 'Variant Management', success: 99.1, warning: 0.7, error: 0.2 },
  { category: 'Inventory Sync', success: 96.4, warning: 2.1, error: 1.5 },
  { category: 'Price Sync', success: 99.8, warning: 0.1, error: 0.1 },
  { category: 'Image Sync', success: 95.3, warning: 3.2, error: 1.5 },
  { category: 'Metafield Sync', success: 98.7, warning: 0.9, error: 0.4 },
];

const PerformanceMonitor: React.FC = () => {
  // Calculate totals and averages
  const totalSyncDuration = syncHistory.reduce((sum, record) => sum + record.duration, 0);
  const averageSyncDuration = totalSyncDuration / syncHistory.length;
  const totalProductsProcessed = syncHistory.reduce((sum, record) => sum + record.products, 0);
  const successRate = syncHistory.filter(record => record.status === 'success').length / syncHistory.length * 100;
  
  // Statistics for display
  const stats = {
    avgDuration: averageSyncDuration.toFixed(1),
    totalProducts: totalProductsProcessed,
    successRate: successRate.toFixed(1),
    lastSync: syncHistory[syncHistory.length - 1].date,
    apiRequests: apiUsage.reduce((sum, day) => sum + day.requests, 0),
    apiCredits: apiUsage.reduce((sum, day) => sum + day.credits, 0),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-500" />
          Sync Performance Monitor
        </CardTitle>
        <CardDescription>
          Monitor synchronization performance and API usage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Sync Duration</p>
                  <h3 className="text-2xl font-bold">{stats.avgDuration} seconds</h3>
                </div>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 flex items-center text-xs">
                <ArrowDownRight className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">8% faster</span>
                <span className="text-muted-foreground ml-1">than last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <h3 className="text-2xl font-bold">{stats.successRate}%</h3>
                </div>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2">
                <Progress value={parseFloat(stats.successRate)} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">API Requests (7 days)</p>
                  <h3 className="text-2xl font-bold">{stats.apiRequests.toLocaleString()}</h3>
                </div>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 flex items-center text-xs">
                <ArrowUpRight className="h-3 w-3 text-amber-500 mr-1" />
                <span className="text-amber-500 font-medium">12% increase</span>
                <span className="text-muted-foreground ml-1">from previous week</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="history">
          <TabsList>
            <TabsTrigger value="history">Sync History</TabsTrigger>
            <TabsTrigger value="api">API Usage</TabsTrigger>
            <TabsTrigger value="errors">Error Rates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={syncHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="duration"
                  name="Sync Duration (seconds)"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorDuration)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="products"
                  name="Products Processed"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Recent Sync Operations</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Products</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {syncHistory.slice(-5).reverse().map((record, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-2 whitespace-nowrap text-sm">{record.date}</td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm">{record.duration} seconds</td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm">{record.products}</td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm">
                          {record.status === 'success' && (
                            <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Success</Badge>
                          )}
                          {record.status === 'warning' && (
                            <Badge variant="outline" className="text-amber-500 border-amber-500"><AlertCircle className="h-3 w-3 mr-1" /> Warning</Badge>
                          )}
                          {record.status === 'error' && (
                            <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> Error</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="api" className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={apiUsage} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="requests"
                  name="API Requests"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="credits"
                  name="API Credits Used"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="text-sm font-medium mb-2">Usage Summary</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Total Requests (7 days):</dt>
                      <dd className="text-sm font-medium">{stats.apiRequests.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Total Credits Used:</dt>
                      <dd className="text-sm font-medium">{stats.apiCredits}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Average Requests Per Day:</dt>
                      <dd className="text-sm font-medium">{(stats.apiRequests / 7).toFixed(0)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Plan Limit:</dt>
                      <dd className="text-sm font-medium">10,000 / month</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Usage:</dt>
                      <dd className="text-sm font-medium">42% of monthly limit</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h4 className="text-sm font-medium mb-2">API Endpoint Usage</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { name: 'Products', value: 45 },
                      { name: 'Variants', value: 30 },
                      { name: 'Inventory', value: 15 },
                      { name: 'Metafields', value: 10 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
                      <Bar dataKey="value" fill="#8884d8" name="Percentage" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="errors" className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={errorRates}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="category" type="category" width={150} />
                <Tooltip formatter={(value) => [`${value}%`, 'Rate']} />
                <Legend />
                <Bar dataKey="success" stackId="a" fill="#4ade80" name="Success" />
                <Bar dataKey="warning" stackId="a" fill="#facc15" name="Warning" />
                <Bar dataKey="error" stackId="a" fill="#f87171" name="Error" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Common Error Types</h4>
              <ul className="space-y-2">
                <li className="p-3 bg-red-50 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">API Rate Limit Exceeded</p>
                      <p className="text-sm text-muted-foreground">26% of all errors</p>
                    </div>
                  </div>
                </li>
                <li className="p-3 bg-red-50 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Metafield Validation Errors</p>
                      <p className="text-sm text-muted-foreground">19% of all errors</p>
                    </div>
                  </div>
                </li>
                <li className="p-3 bg-red-50 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Image Processing Failures</p>
                      <p className="text-sm text-muted-foreground">17% of all errors</p>
                    </div>
                  </div>
                </li>
                <li className="p-3 bg-red-50 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Connection Timeouts</p>
                      <p className="text-sm text-muted-foreground">12% of all errors</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceMonitor;
