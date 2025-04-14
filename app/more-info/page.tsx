"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ComparisonChart } from "@/components/comparison-chart"
import { ComparisonTable } from "@/components/comparison-table"
import { SeasonalCalendar } from "@/components/seasonal-calendar"
import { BloomCalendarChart } from "@/components/bloom-calendar-chart"
import { Calendar, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MoreInfoPage() {
  const [selectedSeason, setSelectedSeason] = useState<string>("spring")
  const [plantType, setPlantType] = useState("all")
  const [color, setColor] = useState("all")

  // Sample plants for comparison
  const samplePlants = ["lavender", "sedum", "ornamental-grass"]

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Additional Information</h1>
        <p className="text-muted-foreground">
          Explore additional tools and information about Rotterdam's biodiversity.
        </p>
      </div>

      <Tabs defaultValue="compare" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="compare">Compare Plants</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Patterns</TabsTrigger>
          <TabsTrigger value="bloom">Bloom Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="compare" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Compare Plants</CardTitle>
              <CardDescription>
                Compare different plant species side by side to find the best options for your needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Sample Plant Comparison</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Below is a comparison of three popular plants for wall facades. For a customized comparison, use our
                  interactive tool.
                </p>
                <ComparisonChart plants={samplePlants} />
              </div>

              <ComparisonTable plants={samplePlants} />

              <div className="flex justify-center mt-6">
                <Button asChild>
                  <Link href="/interactive-tools/find-plant">
                    Build Your Custom Facade <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Patterns</CardTitle>
              <CardDescription>Understand how Rotterdam's flora changes throughout the seasons.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={selectedSeason === "spring" ? "default" : "outline"}
                  onClick={() => setSelectedSeason("spring")}
                >
                  Spring (Mar-May)
                </Button>
                <Button
                  variant={selectedSeason === "summer" ? "default" : "outline"}
                  onClick={() => setSelectedSeason("summer")}
                >
                  Summer (Jun-Aug)
                </Button>
                <Button
                  variant={selectedSeason === "autumn" ? "default" : "outline"}
                  onClick={() => setSelectedSeason("autumn")}
                >
                  Autumn (Sep-Nov)
                </Button>
                <Button
                  variant={selectedSeason === "winter" ? "default" : "outline"}
                  onClick={() => setSelectedSeason("winter")}
                >
                  Winter (Dec-Feb)
                </Button>
              </div>

              <SeasonalCalendar season={selectedSeason} type="blooming" />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Spring Bloomers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Tulips (Tulipa spp.)</li>
                      <li>Daffodils (Narcissus spp.)</li>
                      <li>Cherry Blossoms (Prunus spp.)</li>
                      <li>Crocus (Crocus spp.)</li>
                      <li>Hyacinth (Hyacinthus spp.)</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Summer Bloomers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Roses (Rosa spp.)</li>
                      <li>Lavender (Lavandula spp.)</li>
                      <li>Sunflowers (Helianthus spp.)</li>
                      <li>Dahlias (Dahlia spp.)</li>
                      <li>Hydrangeas (Hydrangea spp.)</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Year-round Interest</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Evergreen Conifers</li>
                      <li>Ornamental Grasses</li>
                      <li>Hellebores (Winter to Spring)</li>
                      <li>Witch Hazel (Winter)</li>
                      <li>Heather (Various seasons)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-6">
                <Button asChild>
                  <Link href="/interactive-tools/find-plant">
                    Find Seasonal Plants for Your Facade <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bloom" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bloom Calendar</CardTitle>
              <CardDescription>
                Visual timeline of when different plant species flower throughout the year in Rotterdam.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">Bloom Calendar</h3>
              </div>

              <BloomCalendarChart plantType={plantType} color={color} />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div className="flex justify-center mt-6">
                <Button asChild>
                  <Link href="/interactive-tools/find-plant">
                    Create a Year-Round Blooming Facade <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
