
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronRight, 
  Search, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  ClockIcon, 
  UserCheck,
  Inbox,
  Send,
  BarChart3,
  BarChart4,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for demonstration
  const pendingForms = [
    { id: '1', brand: 'Chanel', type: 'Fragrance', submitted: '2 hours ago', status: 'pending' },
    { id: '2', brand: 'Dior', type: 'Makeup', submitted: '1 day ago', status: 'pending' },
    { id: '3', brand: 'Clarins', type: 'Skincare', submitted: '3 days ago', status: 'pending' },
  ];
  
  const missingFields = [
    { id: '4', brand: 'Lancôme', type: 'Makeup', submitted: '2 days ago', missingFields: ['Images', 'Ingredients'] },
    { id: '5', brand: 'Guerlain', type: 'Fragrance', submitted: '4 days ago', missingFields: ['Price', 'Dimensions'] },
  ];
  
  const recentlyValidated = [
    { id: '6', brand: 'YSL', type: 'Makeup', validated: '1 day ago', validator: 'Alex Smith' },
    { id: '7', brand: 'Estée Lauder', type: 'Skincare', validated: '3 days ago', validator: 'Emma Johnson' },
  ];
  
  const statusMetrics = [
    { label: 'Pending Validation', value: 12, color: 'bg-amber-500' },
    { label: 'Missing Information', value: 8, color: 'bg-red-500' },
    { label: 'Validated', value: 45, color: 'bg-green-500' },
    { label: 'Ready for Shopify', value: 34, color: 'bg-blue-500' },
  ];
  
  const filteredPendingForms = pendingForms.filter(form => 
    form.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredMissingFields = missingFields.filter(form => 
    form.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-6 pt-20 pb-12 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and monitor new line forms from your suppliers.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="transition-all duration-300 hover:shadow-soft-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Inbox className="w-4 h-4 mr-2 text-primary" />
              New Submissions
            </CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                12%
              </span> 
              from last week
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-soft-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-primary" />
              Awaiting Information
            </CardTitle>
            <CardDescription>Missing fields</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span className="text-red-500 flex items-center mr-1">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                5%
              </span> 
              from last week
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-soft-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
              Validated Products
            </CardTitle>
            <CardDescription>Ready for Shopify</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">34</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                18%
              </span> 
              from last week
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-soft-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Status Overview</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                <BarChart4 className="mr-1 h-3.5 w-3.5" />
                View Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <span className="text-sm text-muted-foreground">{metric.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${metric.color}`} 
                      style={{ width: `${(metric.value / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-soft-lg">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 rounded-full p-1">
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">YSL foundation validated</p>
                  <p className="text-xs text-muted-foreground">1 hour ago by Alex Smith</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-amber-500/10 rounded-full p-1">
                  <Inbox className="h-3 w-3 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">New submission from Dior</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-blue-500/10 rounded-full p-1">
                  <Send className="h-3 w-3 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Notification sent to Lancôme</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-500/10 rounded-full p-1">
                  <FileSpreadsheet className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Excel report generated</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full h-8 text-xs">
              View All Activity
              <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="pending">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="pending" className="text-xs">Pending Validation</TabsTrigger>
              <TabsTrigger value="missing" className="text-xs">Missing Fields</TabsTrigger>
              <TabsTrigger value="validated" className="text-xs">Recently Validated</TabsTrigger>
            </TabsList>
            
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search forms..."
                className="w-full pl-9 h-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="pending" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pending Validation</CardTitle>
                <CardDescription>
                  Forms awaiting human validation before being published to Shopify.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredPendingForms.length > 0 ? (
                  <div className="grid grid-cols-1 divide-y divide-border">
                    {filteredPendingForms.map((form) => (
                      <div key={form.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{form.brand}</h3>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="text-xs mr-2">{form.type}</Badge>
                              <span className="text-xs text-muted-foreground">Submitted {form.submitted}</span>
                            </div>
                          </div>
                          <Link to={`/validation/${form.id}`}>
                            <Button size="sm" className="h-8">
                              Validate
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground/30" />
                    <h3 className="mt-4 text-lg font-medium">No pending forms found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {searchQuery ? 'Try a different search term.' : 'All forms have been validated. Great job!'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="missing" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Missing Fields</CardTitle>
                <CardDescription>
                  Forms with missing required information from suppliers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredMissingFields.length > 0 ? (
                  <div className="grid grid-cols-1 divide-y divide-border">
                    {filteredMissingFields.map((form) => (
                      <div key={form.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{form.brand}</h3>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="text-xs mr-2">{form.type}</Badge>
                              <span className="text-xs text-muted-foreground">Submitted {form.submitted}</span>
                            </div>
                            <div className="mt-2">
                              <p className="text-xs text-muted-foreground mb-1">Missing fields:</p>
                              <div className="flex flex-wrap gap-1">
                                {form.missingFields.map((field, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{field}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="h-8">
                            Send Reminder
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground/30" />
                    <h3 className="mt-4 text-lg font-medium">No missing information</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {searchQuery ? 'Try a different search term.' : 'All suppliers have provided complete information.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="validated" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recently Validated</CardTitle>
                <CardDescription>
                  Forms that have been validated and are ready for Shopify.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 divide-y divide-border">
                  {recentlyValidated.map((form) => (
                    <div key={form.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{form.brand}</h3>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="text-xs mr-2">{form.type}</Badge>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <UserCheck className="mr-1 h-3 w-3" />
                              Validated by {form.validator}
                            </div>
                          </div>
                          <div className="mt-1">
                            <span className="text-xs text-muted-foreground">{form.validated}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="h-8">
                            <FileSpreadsheet className="mr-1 h-3.5 w-3.5" />
                            Export
                          </Button>
                          <Button size="sm" className="h-8">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
