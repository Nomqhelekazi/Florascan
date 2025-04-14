"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Euro, Calendar, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FacadeVisualization } from "@/components/facade-visualization"
import { FacadeVisualization3D } from "@/components/facade-visualization-3d"
import { fetchPlants } from "@/lib/api"
import type { Plant } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Create a simple cache for plant data
const plantCache: Record<string, Plant[]> = {}

export default function FacadePreviewPage() {
  const searchParams = useSearchParams()
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d")

  // Get plant IDs from URL if available
  const plantIdsParam = searchParams.get("plants") || ""
  const plantIds = useMemo(() => plantIdsParam.split(",").filter(Boolean), [plantIdsParam])

  // Fetch only the necessary plants
  useEffect(() => {
    const loadPlants = async () => {
      try {
        setLoading(true)
        setError(null)

        // Check if we have the data in cache
        const cacheKey = plantIds.length > 0 ? plantIds.join(",") : "default"

        if (plantCache[cacheKey]) {
          setPlants(plantCache[cacheKey])
          setLoading(false)
          return
        }

        // Fetch all plants (in a real app, we would fetch only the needed plants)
        const allPlants = await fetchPlants()

        let selectedPlants: Plant[]
        if (plantIds.length > 0) {
          // Filter plants by IDs from URL
          selectedPlants = allPlants.filter((plant) => plantIds.includes(plant.id))

          // If we couldn't find all the requested plants, log a warning
          if (selectedPlants.length < plantIds.length) {
            console.warn("Some requested plants could not be found")
          }
        } else {
          // If no plant IDs provided, use top 3 plants as example
          selectedPlants = allPlants.slice(0, 3)
        }

        // Store in cache
        plantCache[cacheKey] = selectedPlants

        setPlants(selectedPlants)
      } catch (error) {
        console.error("Failed to load plants:", error)
        setError("Failed to load plants. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadPlants()
  }, [plantIds])

  // Preload images for better performance
  useEffect(() => {
    if (plants.length > 0) {
      plants.forEach((plant) => {
        if (plant.imageUrl) {
          const img = new Image()
          img.src = plant.imageUrl
        }
      })
    }
  }, [plants])

  // Calculate estimated costs based on selected plants
  const costEstimates = useMemo(() => {
    const baseInstallationCost = 120 // €/m²
    const baseMaintenance = 15 // €/m²/year

    // Adjust costs based on plant types
    const installationMultiplier =
      plants.length > 0
        ? plants.reduce((sum, plant) => sum + (plant.growthRate === "fast" ? 0.8 : 1.2), 0) / plants.length
        : 1

    const maintenanceMultiplier =
      plants.length > 0
        ? plants.reduce(
            (sum, plant) =>
              sum + (plant.maintenanceLevel === "low" ? 0.7 : plant.maintenanceLevel === "medium" ? 1 : 1.5),
            0,
          ) / plants.length
        : 1

    return {
      installation: Math.round(baseInstallationCost * installationMultiplier),
      maintenance: Math.round(baseMaintenance * maintenanceMultiplier),
      lifespan:
        plants.length > 0
          ? Math.round(plants.reduce((sum, plant) => sum + (plant.lifespan || 15), 0) / plants.length)
          : 15,
      roi: 7, // years to return on investment
    }
  }, [plants])

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Green Facade Visualization</h1>
            <p className="text-muted-foreground mt-2">See how your selected plants would look on a green facade</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/interactive-tools/find-plant">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Build Your Facade
              </Link>
            </Button>
          </div>
        </div>

        {error ? (
          <div className="flex items-center justify-center h-[500px] bg-red-50 rounded-lg">
            <div className="flex flex-col items-center gap-2 text-red-600">
              <p>{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </div>
        ) : loading ? (
          <div className="space-y-4">
            <Skeleton className="h-[500px] w-full rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "2d" | "3d")}>
                <TabsList>
                  <TabsTrigger value="2d" className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    </svg>
                    2D View
                  </TabsTrigger>
                  <TabsTrigger value="3d" className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3L2 12l10 9 10-9-10-9z"></path>
                      <path d="M2 12l10 9 10-9"></path>
                      <path d="M12 3v18"></path>
                    </svg>
                    3D View
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {viewMode === "2d" ? (
              <FacadeVisualization
                plants={plants}
                title="Your Green Facade"
                description="Based on your environmental conditions and preferences"
              />
            ) : (
              <FacadeVisualization3D
                plants={plants}
                title="Your Green Facade (3D)"
                description="Explore your facade from different angles"
              />
            )}

            {/* Cost Considerations */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Cost Considerations</CardTitle>
                <CardDescription>Quantified estimates for your green facade implementation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Euro className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold">Installation Cost</h3>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">€{costEstimates.installation}/m²</p>
                    <p className="text-sm text-slate-500 mt-1">
                      One-time installation cost including materials, plants, and labor
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Euro className="h-5 w-5 text-amber-600" />
                      <h3 className="font-semibold">Maintenance Cost</h3>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">€{costEstimates.maintenance}/m²</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Annual maintenance cost including pruning, fertilizing, and pest control
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold">Expected Lifespan</h3>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">{costEstimates.lifespan} years</p>
                    <p className="text-sm text-slate-500 mt-1">Average lifespan of the selected plant combination</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      <h3 className="font-semibold">ROI Period</h3>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">{costEstimates.roi} years</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Estimated time to recover investment through energy savings
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Reduces urban heat island effect by 2-4°C</li>
                    <li>Captures 0.5-1.7 kg/m² of air pollutants annually</li>
                    <li>Provides 5-15% energy savings through insulation</li>
                    <li>Manages 40-60% of incident rainfall</li>
                    <li>Increases biodiversity by 30-50% compared to bare walls</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Implementation Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Install proper support structures for climbing plants</li>
                    <li>Ensure adequate soil volume and drainage</li>
                    <li>Consider irrigation systems for establishment</li>
                    <li>Plant at appropriate spacing for mature size</li>
                    <li>Combine different plant types for year-round interest</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Regular pruning to control growth and shape</li>
                    <li>Monitor for pests and diseases</li>
                    <li>Check support structures annually</li>
                    <li>Fertilize according to plant needs</li>
                    <li>Replace any plants that fail to thrive</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
