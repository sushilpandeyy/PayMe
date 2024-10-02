"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import Image from 'next/image'
import axios from "axios" 


export default function Cryptocard(){
   return  <Card
    className="max-w-xs" x-chunk="charts-01-chunk-7"
  >
    <CardHeader>
    <Image
      src=""
      width={500}
      height={500}
      alt="Picture of the author"
    />
  </CardHeader>
  <CardContent>
    usd2inr
  </CardContent>
  </Card>

}