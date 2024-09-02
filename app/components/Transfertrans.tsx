"use client";
import { Button } from "@/components/ui/button";
import { Card, 
    CardContent, 
    CardDescription, 
    CardTitle, 
    CardHeader,
    CardFooter
}   from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Share } from "lucide-react";

export default function Transfertrans(){

    return <Card
    className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
  >
    <CardHeader className="pb-3">
      <CardTitle>
      </CardTitle>
      <CardDescription className="text-balance max-w-lg leading-relaxed">
      <Tabs defaultValue="Send" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Send">Send</TabsTrigger>
        <TabsTrigger value="Receive">Receive</TabsTrigger>
      </TabsList>
      <TabsContent value="Send">
        <Card>
          <CardHeader>
            <CardTitle>Send Money</CardTitle>
            <CardDescription>
              Send money to any userid
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="User ID">User ID</Label>
              <Input id="User_ID" placeholder="Enter Reciver's UserID" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Amount</Label>
              <Input id="amount" type="number" placeholder="Enter Amount"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Send</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Receive">
        <Card>
          <CardHeader>
            <CardTitle>Recieve Amount</CardTitle>
            <CardDescription>
              Recieve Money Via QR or User_ID
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="flex items-end justify-between">
           <span className="text-lg">
           Order Oe31b70H
           </span>
           <span className="text-lg">
           <Share/>
           </span>
           </div>
           <div className="h-20"></div>
           <span className="text-lg">
           Qr Code
           </span>
          </CardContent>
          <CardFooter>
            
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
      </CardDescription>
    </CardHeader>
    <CardFooter>
     
    </CardFooter>
  </Card>

}