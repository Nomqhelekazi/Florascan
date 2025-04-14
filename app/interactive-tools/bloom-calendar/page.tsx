"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BloomCalendarChart } from "@/components/bloom-calendar-chart"

export default function BloomCalendar() {
  const [plantType, setPlantType] = useState("all")
  const [color, setColor] = useState("all")

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seasonal Bloom Calendar</h1>
          <p className="text-muted-foreground mt-2">
            Visual timeline of when different plant species flower throughout the year.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Filter Plants</CardTitle>
            </div>
            <CardDescription>Narrow down the bloom calendar by plant type and flower color.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="plant-type">Plant Type</Label>
                <Select value={plantType} onValueChange={setPlantType}>
                  <SelectTrigger id="plant-type">
                    <SelectValue placeholder="All plant types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All plant types</SelectItem>
                    <SelectItem value="tree">Trees</SelectItem>
                    <SelectItem value="shrub">Shrubs</SelectItem>
                    <SelectItem value="flower">Flowers</SelectItem>
                    <SelectItem value="bulb">Bulbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Flower Color</Label>
                <Select value={color} onValueChange={setColor}>
                  <SelectTrigger id="color">
                    <SelectValue placeholder="All colors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All colors</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                    <SelectItem value="yellow">Yellow</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="blue">Blue/Purple</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Bloom Calendar</CardTitle>
            </div>
            <CardDescription>Visual representation of blooming periods throughout the year.</CardDescription>
          </CardHeader>
          <CardContent>
            <BloomCalendarChart plantType={plantType} color={color} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Spring Bloomers</CardTitle>
              <CardDescription>March - May</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                  <span>Cherry Blossom (Prunus spp.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span>Daffodil (Narcissus spp.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Crocus (Crocus spp.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Tulip (Tulipa spp.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white border"></div>
                  <span>Magnolia (Magnolia spp.)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Summer Bloomers</CardTitle>
              <CardDescription>June - August</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                  <span>Rose (Rosa spp.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Lavender (Lavandula spp.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span>Sunflower (Helianthus spp.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Hydrangea (Hydrangea spp.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Dahlia (Dahlia spp.)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Autumn Bloomers</CardTitle>
              <CardDescription>September - November</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Aster (Aster spp.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                  <span>Chrysanthemum (Chrysanthemum spp.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span>Goldenrod (Solidago spp.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Japanese Anemone (Anemone hupehensis)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white border"></div>
                  <span>Autumn Crocus (Colchicum autumnale)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Button className="w-full md:w-auto md:self-center">Download Bloom Calendar as PDF</Button>
      </div>
    </div>
  )
}
