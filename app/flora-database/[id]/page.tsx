"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Leaf, Thermometer, Wind, SunMedium, Ruler, Calendar } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchPlantById } from "@/lib/api"
import type { Plant } from "@/lib/types"

export default function PlantDetails() {
  const params = useParams()
  const router = useRouter()
  const [plant, setPlant] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPlant = async () => {
      try {
        if (typeof params.id === "string") {
          const data = await fetchPlantById(params.id)
          setPlant(data)
        }
      } catch (error) {
        console.error("Failed to fetch plant:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPlant()
  }, [params.id])

  if (loading) {
    return (
      <div className="container py-6 md:py-10">
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse space-y-4 w-full max-w-3xl">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!plant) {
    return (
      <div className="container py-6 md:py-10">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold mb-4">Plant Not Found</h1>
          <p className="text-muted-foreground mb-6">The plant you are looking for does not exist in our database.</p>
          <Button onClick={() => router.push("/flora-database")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Flora Database
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
        <Button variant="ghost" className="w-fit" onClick={() => router.push("/flora-database")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Flora Database
        </Button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <div className="rounded-lg overflow-hidden border">
              <img
                src={plant.imageUrl || `/placeholder.svg?height=400&width=400`}
                alt={plant.commonName}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold">{plant.commonName}</h1>
                <p className="text-xl italic text-muted-foreground">{plant.scientificName}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
                >
                  {plant.type}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                >
                  {plant.nativeStatus}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-300 dark:hover:bg-amber-800"
                >
                  {plant.lifespan}
                </Badge>
                {plant.droughtResistant && (
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-300 dark:hover:bg-orange-800"
                  >
                    Drought Resistant
                  </Badge>
                )}
              </div>

              {plant.description && <p className="text-muted-foreground">{plant.description}</p>}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-3 border rounded-lg">
                  <Thermometer className="h-5 w-5 text-red-500 mb-1" />
                  <span className="text-xs text-muted-foreground">Temperature</span>
                  <span className="font-medium text-sm">
                    {plant.temperatureTolerance
                      ? `${plant.temperatureTolerance.min}°C to ${plant.temperatureTolerance.max}°C`
                      : "Moderate"}
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 border rounded-lg">
                  <Wind className="h-5 w-5 text-blue-500 mb-1" />
                  <span className="text-xs text-muted-foreground">Wind Resistance</span>
                  <span className="font-medium text-sm">{plant.windResistance}</span>
                </div>
                <div className="flex flex-col items-center p-3 border rounded-lg">
                  <SunMedium className="h-5 w-5 text-amber-500 mb-1" />
                  <span className="text-xs text-muted-foreground">Sun Exposure</span>
                  <span className="font-medium text-sm">{plant.sunExposure}</span>
                </div>
                <div className="flex flex-col items-center p-3 border rounded-lg">
                  <Ruler className="h-5 w-5 text-indigo-500 mb-1" />
                  <span className="text-xs text-muted-foreground">Height</span>
                  <span className="font-medium text-sm">
                    {plant.height
                      ? `${plant.height < 100 ? plant.height : plant.height / 100}${plant.height < 100 ? "cm" : "m"}`
                      : "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <Tabs defaultValue="characteristics">
          <TabsList>
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal Patterns</TabsTrigger>
            <TabsTrigger value="ecological">Ecological Benefits</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Growth Characteristics</CardTitle>
                <CardDescription>Key information about how this plant grows and its requirements.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Type:</span>
                      <span className="ml-2">{plant.type}</span>
                    </div>
                    <div>
                      <span className="font-medium">Growth Speed:</span>
                      <span className="ml-2">{plant.growthSpeed}</span>
                    </div>
                    <div>
                      <span className="font-medium">Native Status:</span>
                      <span className="ml-2">{plant.nativeStatus}</span>
                    </div>
                    <div>
                      <span className="font-medium">Lifespan:</span>
                      <span className="ml-2">{plant.lifespan}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Biodiversity Value:</span>
                      <span className="ml-2">{plant.biodiversityValue}</span>
                    </div>
                    <div>
                      <span className="font-medium">Sun Exposure:</span>
                      <span className="ml-2">{plant.sunExposure}</span>
                    </div>
                    <div>
                      <span className="font-medium">Wind Resistance:</span>
                      <span className="ml-2">{plant.windResistance}</span>
                    </div>
                    <div>
                      <span className="font-medium">Drought Resistant:</span>
                      <span className="ml-2">{plant.droughtResistant ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="seasonal" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Patterns</CardTitle>
                <CardDescription>How this plant changes throughout the seasons in Rotterdam.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Blooming Season:</span>
                    <span>{plant.bloomingSeason || "Information not available"}</span>
                  </div>

                  {plant.dormancyPeriod && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Dormancy Period:</span>
                      <span>{plant.dormancyPeriod}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-4 gap-2 mt-4">
                    <div
                      className={`p-3 rounded-lg text-center ${plant.bloomingSeason === "spring" ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                    >
                      <p className="font-medium">Spring</p>
                      <p className="text-xs mt-1">{plant.bloomingSeason === "spring" ? "Blooming" : "Vegetative"}</p>
                    </div>
                    <div
                      className={`p-3 rounded-lg text-center ${plant.bloomingSeason === "summer" ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                    >
                      <p className="font-medium">Summer</p>
                      <p className="text-xs mt-1">{plant.bloomingSeason === "summer" ? "Blooming" : "Vegetative"}</p>
                    </div>
                    <div
                      className={`p-3 rounded-lg text-center ${plant.bloomingSeason === "autumn" ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                    >
                      <p className="font-medium">Autumn</p>
                      <p className="text-xs mt-1">{plant.bloomingSeason === "autumn" ? "Blooming" : "Vegetative"}</p>
                    </div>
                    <div
                      className={`p-3 rounded-lg text-center ${plant.bloomingSeason === "winter" ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                    >
                      <p className="font-medium">Winter</p>
                      <p className="text-xs mt-1">{plant.bloomingSeason === "winter" ? "Blooming" : "Dormant"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ecological" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Ecological Benefits</CardTitle>
                <CardDescription>How this plant contributes to the ecosystem and biodiversity.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plant.ecologicalBenefits && plant.ecologicalBenefits.length > 0 ? (
                    <div>
                      <h3 className="font-medium mb-2">Ecological Benefits:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {plant.ecologicalBenefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>No specific ecological benefits recorded for this plant.</p>
                  )}

                  {plant.faunaDependency && plant.faunaDependency.length > 0 ? (
                    <div className="mt-4">
                      <h3 className="font-medium mb-2">Supports Fauna:</h3>
                      <div className="flex flex-wrap gap-2">
                        {plant.faunaDependency.map((fauna, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800"
                          >
                            {fauna}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="font-medium mb-2">Biodiversity Value:</h3>
                    <p>{getBiodiversityDescription(plant.biodiversityValue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/flora-database")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Flora Database
          </Button>
          <Button onClick={() => router.push("/interactive-tools/find-plant")}>
            <Leaf className="mr-2 h-4 w-4" />
            Find Similar Plants
          </Button>
        </div>
      </div>
    </div>
  )
}

function getBiodiversityDescription(value: string | undefined): string {
  switch (value) {
    case "high":
      return "This plant has high biodiversity value, providing significant support for various species of wildlife through food, shelter, or as a host plant."
    case "medium":
      return "This plant has moderate biodiversity value, offering some benefits to wildlife and contributing to ecosystem health."
    case "low":
      return "This plant has limited biodiversity value but may still provide some ecological benefits in the right context."
    default:
      return "Biodiversity value information not available for this plant."
  }
}
