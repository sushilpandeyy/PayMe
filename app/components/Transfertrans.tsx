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
              <Label htmlFor="name">User_ID</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
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
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
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