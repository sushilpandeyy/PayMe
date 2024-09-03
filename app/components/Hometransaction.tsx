"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";  
import {ListFilter, File, Badge} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


export default function HomeTransaction(){
  function Tabshead(){
    return <div className="flex items-center">
    <TabsList>
      <TabsTrigger value="week">Week</TabsTrigger>
      <TabsTrigger value="month">Month</TabsTrigger>
      <TabsTrigger value="year">Year</TabsTrigger>
    </TabsList>
    <div className="ml-auto flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 text-sm"
          >
            <ListFilter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Filter</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>
            Credit
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            Debit
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            Error
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        size="sm"
        variant="outline"
        className="h-7 gap-1 text-sm"
      >
        <File className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only">Report</span>
      </Button>
    </div>
  </div>
}



return   <Tabs defaultValue="week">
    <div className="p-4">
    <Tabshead/>
    </div>
<TabsContent value="week">
  <Card x-chunk="dashboard-05-chunk-3">
    <CardHeader className="px-7">
      <CardTitle>Transactions</CardTitle>
      <CardDescription>
        Recent week transactions
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Recipent</TableHead>
            <TableHead className="hidden sm:table-cell">
              Type
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Date
            </TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-accent">
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              Sale
            </TableCell>
            <TableCell className="hidden md:table-cell">
              2023-06-23
            </TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</TabsContent>
</Tabs>
}