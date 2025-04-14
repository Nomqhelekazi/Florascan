"use client"

import { useState } from "react"
import { Droplets, Moon, Flower, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SeasonalCalendar } from "@/components/seasonal-calendar"

export default function SeasonalPatterns() {
  const [selectedSeason, setSelectedSeason] = useState<string>("spring")

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seasonal Patterns Explorer</h1>
          <p className="text-muted-foreground mt-2">
            Discover how flora changes throughout the seasons. Explore drought-resistant species, dormancy cycles, and
            blooming periods.
          </p>
        </div>

        <Tabs defaultValue="blooming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="blooming">
              <Flower className="mr-2 h-4 w-4" />
              Blooming Seasons
            </TabsTrigger>
            <TabsTrigger value="drought">
              <Droplets className="mr-2 h-4 w-4" />
              Drought Periods
            </TabsTrigger>
            <TabsTrigger value="dormancy">
              <Moon className="mr-2 h-4 w-4" />
              Dormancy Cycles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blooming" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Blooming Seasons</CardTitle>
                <CardDescription>Explore which plants bloom during different seasons in Rotterdam.</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drought" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Drought Periods</CardTitle>
                <CardDescription>
                  Discover drought-resistant species that thrive during dry periods in Rotterdam.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg mb-6">
                  <h3 className="font-medium flex items-center">
                    <Droplets className="mr-2 h-5 w-5 text-amber-600" />
                    Rotterdam Drought Patterns
                  </h3>
                  <p className="text-sm mt-2">
                    Rotterdam typically experiences drier periods during late spring and summer months (May-August).
                    Climate change is increasing the frequency and severity of drought periods, making drought-resistant
                    plants increasingly important for sustainable urban landscaping.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-lg mb-4">Drought-Resistant Species</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Leaf className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Sedum (Stonecrop)</h4>
                          <p className="text-sm text-muted-foreground italic">Sedum spp.</p>
                          <p className="text-sm mt-1">
                            Succulent leaves store water, making them extremely drought-tolerant.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Leaf className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Lavender</h4>
                          <p className="text-sm text-muted-foreground italic">Lavandula spp.</p>
                          <p className="text-sm mt-1">
                            Silver-gray foliage and woody stems help conserve water during dry periods.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Leaf className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Russian Sage</h4>
                          <p className="text-sm text-muted-foreground italic">Perovskia atriplicifolia</p>
                          <p className="text-sm mt-1">Deep root system accesses water far below the surface.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-4">Drought Adaptation Strategies</h3>
                    <Card className="mb-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Water Storage</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p>Plants like succulents store water in fleshy leaves, stems, or roots.</p>
                      </CardContent>
                    </Card>
                    <Card className="mb-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Reduce Water Loss</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p>Small, waxy, or hairy leaves reduce surface area and prevent water evaporation.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Deep Root Systems</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p>Extensive root networks access water deep in the soil profile.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dormancy" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Dormancy Cycles</CardTitle>
                <CardDescription>
                  Understand when plants go dormant and reactivate throughout the year in Rotterdam.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-6">
                  <h3 className="font-medium flex items-center">
                    <Moon className="mr-2 h-5 w-5 text-blue-600" />
                    Understanding Plant Dormancy
                  </h3>
                  <p className="text-sm mt-2">
                    Dormancy is a period when plant growth and development temporarily stop. In Rotterdam's climate,
                    many plants enter dormancy during winter months as a survival strategy to cope with cold
                    temperatures and reduced daylight hours.
                  </p>
                </div>

                <SeasonalCalendar season={selectedSeason} type="dormancy" />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Winter Dormancy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">
                        Most common in Rotterdam's climate. Plants conserve energy during cold months.
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Deciduous trees (Oak, Maple)</li>
                        <li>Perennial flowers</li>
                        <li>Fruit trees</li>
                        <li>Ornamental grasses</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Summer Dormancy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">
                        Less common in Rotterdam but occurs in some species during hot, dry periods.
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Spring bulbs (Tulips, Daffodils)</li>
                        <li>Some Mediterranean plants</li>
                        <li>Certain woodland species</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Dormancy Breakers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">Environmental cues that signal plants to end dormancy.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Temperature changes</li>
                        <li>Increased daylight hours</li>
                        <li>Moisture availability</li>
                        <li>Hormonal changes</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
