"use client"

import type React from "react"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Search, Thermometer, Wind, SunMedium, Ruler, Leaf, Droplets, Settings, Bug } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlantRecommendationCard } from "@/components/plant-recommendation-card"
import { Separator } from "@/components/ui/separator"
import { fetchPlants } from "@/lib/api"
import type { Plant } from "@/lib/types"

// Create a debounce function to limit expensive operations
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export default function FindPlant() {
  const [temperatureRange, setTemperatureRange] = useState([-5, 35])
  const [windResistance, setWindResistance] = useState<string[]>(["medium"])
  const [sunExposure, setSunExposure] = useState<string[]>(["partial"])
  const [droughtResistance, setDroughtResistance] = useState<string[]>(["moderate"])
  const [plantHeight, setPlantHeight] = useState([100])
  const [plantType, setPlantType] = useState<string[]>(["any"])
  const [maintenanceLevel, setMaintenanceLevel] = useState<string[]>(["moderate"])
  const [supportThreatenedFauna, setSupportThreatenedFauna] = useState(false)
  const [faunaType, setFaunaType] = useState<string[]>(["any"])
  const [showResults, setShowResults] = useState(false)
  const [recommendedPlants, setRecommendedPlants] = useState<Plant[]>([])
  const [allPlants, setAllPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("environmental")
  const [dataLoaded, setDataLoaded] = useState(false)

  // Load plants data only once
  useEffect(() => {
    const loadPlants = async () => {
      try {
        if (!dataLoaded) {
          setLoading(true)
          const data = await fetchPlants()
          setAllPlants(data)
          setDataLoaded(true)
        }
      } catch (error) {
        console.error("Failed to fetch plants:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPlants()
  }, [dataLoaded])

  // Memoize the filter function to prevent unnecessary recalculations
  const filterPlants = useCallback(
    (plants: Plant[]) => {
      return plants.filter((plant) => {
        // Filter by plant type
        if (!plantType.includes("any") && !plantType.includes(plant.type)) {
          return false
        }

        // Filter by maintenance level if available
        if (
          plant.maintenanceLevel &&
          !maintenanceLevel.includes("any") &&
          !maintenanceLevel.includes(plant.maintenanceLevel)
        ) {
          return false
        }

        // Filter by sun exposure
        if (!sunExposure.includes("any") && !sunExposure.includes(plant.sunExposure)) {
          return false
        }

        // Filter by wind resistance
        if (!windResistance.includes("any") && !windResistance.includes(plant.windResistance)) {
          return false
        }

        // Filter by drought resistance
        const isDroughtResistant = plant.droughtResistant ? "high" : "low"
        if (
          !droughtResistance.includes("any") &&
          !droughtResistance.includes(isDroughtResistant) &&
          !droughtResistance.includes("moderate")
        ) {
          return false
        }

        // Filter by height
        if (plant.height > plantHeight[0]) {
          return false
        }

        return true
      })
    },
    [plantType, maintenanceLevel, sunExposure, windResistance, droughtResistance, plantHeight],
  )

  // Debounced search function to prevent excessive calculations
  const debouncedSearch = useMemo(
    () =>
      debounce(async () => {
        setLoading(true)
        try {
          // Filter plants based on criteria
          const filtered = filterPlants(allPlants)

          // Sort by match score (this would be more sophisticated in a real implementation)
          const scored = filtered.map((plant) => ({
            ...plant,
            matchScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-99 for demo
          }))

          const sorted = scored.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
          setRecommendedPlants(sorted.slice(0, 6)) // Get top 6 matches
          setShowResults(true)
        } catch (error) {
          console.error("Error finding plants:", error)
        } finally {
          setLoading(false)
        }
      }, 300),
    [filterPlants, allPlants],
  )

  const handleSearch = () => {
    debouncedSearch()
  }

  const handleCheckboxChange = (
    value: string,
    currentValues: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (value === "any") {
      // If "any" is selected, clear all other selections
      setter(["any"])
    } else {
      // If the value is already selected, remove it
      if (currentValues.includes(value)) {
        // Don't remove if it's the only value left
        if (currentValues.length > 1) {
          setter(currentValues.filter((v) => v !== value && v !== "any"))
        }
      } else {
        // Add the value and remove "any" if it's selected
        setter(currentValues.filter((v) => v !== "any").concat(value))
      }
    }
  }

  const handleNextTab = () => {
    if (activeTab === "environmental") {
      setActiveTab("preferences")
    } else if (activeTab === "preferences") {
      setActiveTab("socioeconomic")
    } else if (activeTab === "socioeconomic") {
      setActiveTab("ecological")
    } else if (activeTab === "ecological") {
      handleSearch()
    }
  }

  // Create URL for facade preview with top 3 plant IDs
  const getFacadePreviewUrl = useMemo(() => {
    const topThreePlantIds = recommendedPlants
      .slice(0, 3)
      .map((plant) => plant.id)
      .join(",")
    return `/interactive-tools/facade-preview?plants=${topThreePlantIds}`
  }, [recommendedPlants])

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find the Right Plant</h1>
          <p className="text-muted-foreground mt-2">
            Input your environmental conditions and preferences to get personalized plant recommendations.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="environmental">
              <Thermometer className="mr-2 h-4 w-4" />
              Environmental Conditions
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Leaf className="mr-2 h-4 w-4" />
              Plant Preferences
            </TabsTrigger>
            <TabsTrigger value="socioeconomic">
              <Settings className="mr-2 h-4 w-4" />
              Maintenance Levels
            </TabsTrigger>
            <TabsTrigger value="ecological">
              <Bug className="mr-2 h-4 w-4" />
              Ecological Conditions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="environmental" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Conditions</CardTitle>
                <CardDescription>Specify the environmental conditions where you plan to grow plants.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="lex items-center justify-between">
                    <Label htmlFor="temperature" className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-red-500" />
                      Temperature Tolerance
                    </Label>
                    <span className="text-sm font-medium">
                      {temperatureRange[0]}°C to {temperatureRange[1]}°C
                    </span>
                  </div>
                  <Slider
                    id="temperature"
                    defaultValue={temperatureRange}
                    max={50}
                    min={-30}
                    step={5}
                    value={temperatureRange}
                    onValueChange={setTemperatureRange}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Cold (-30°C)</span>
                    <span>Moderate (10°C)</span>
                    <span>Hot (50°C)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-blue-500" />
                    Wind Exposure (Select all that apply)
                  </Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wind-any"
                        checked={windResistance.includes("any")}
                        onCheckedChange={() => handleCheckboxChange("any", windResistance, setWindResistance)}
                      />
                      <Label htmlFor="wind-any">Any wind exposure</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wind-low"
                        checked={windResistance.includes("low")}
                        onCheckedChange={() => handleCheckboxChange("low", windResistance, setWindResistance)}
                      />
                      <Label htmlFor="wind-low">Sheltered (Low wind)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wind-medium"
                        checked={windResistance.includes("medium")}
                        onCheckedChange={() => handleCheckboxChange("medium", windResistance, setWindResistance)}
                      />
                      <Label htmlFor="wind-medium">Moderate wind</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wind-high"
                        checked={windResistance.includes("high")}
                        onCheckedChange={() => handleCheckboxChange("high", windResistance, setWindResistance)}
                      />
                      <Label htmlFor="wind-high">Exposed (High wind)</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <SunMedium className="h-4 w-4 text-amber-500" />
                    Sun Exposure (Select all that apply)
                  </Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sun-any"
                        checked={sunExposure.includes("any")}
                        onCheckedChange={() => handleCheckboxChange("any", sunExposure, setSunExposure)}
                      />
                      <Label htmlFor="sun-any">Any sun exposure</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sun-full"
                        checked={sunExposure.includes("full")}
                        onCheckedChange={() => handleCheckboxChange("full", sunExposure, setSunExposure)}
                      />
                      <Label htmlFor="sun-full">Full sun (6+ hours direct sun)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sun-partial"
                        checked={sunExposure.includes("partial")}
                        onCheckedChange={() => handleCheckboxChange("partial", sunExposure, setSunExposure)}
                      />
                      <Label htmlFor="sun-partial">Partial shade (3-6 hours direct sun)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sun-shade"
                        checked={sunExposure.includes("shade")}
                        onCheckedChange={() => handleCheckboxChange("shade", sunExposure, setSunExposure)}
                      />
                      <Label htmlFor="sun-shade">Full shade (less than 3 hours direct sun)</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-cyan-500" />
                    Drought Resistance (Select all that apply)
                  </Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="drought-any"
                        checked={droughtResistance.includes("any")}
                        onCheckedChange={() => handleCheckboxChange("any", droughtResistance, setDroughtResistance)}
                      />
                      <Label htmlFor="drought-any">Any drought resistance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="drought-high"
                        checked={droughtResistance.includes("high")}
                        onCheckedChange={() => handleCheckboxChange("high", droughtResistance, setDroughtResistance)}
                      />
                      <Label htmlFor="drought-high">High (Requires minimal watering)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="drought-moderate"
                        checked={droughtResistance.includes("moderate")}
                        onCheckedChange={() =>
                          handleCheckboxChange("moderate", droughtResistance, setDroughtResistance)
                        }
                      />
                      <Label htmlFor="drought-moderate">Moderate (Regular watering needed)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="drought-low"
                        checked={droughtResistance.includes("low")}
                        onCheckedChange={() => handleCheckboxChange("low", droughtResistance, setDroughtResistance)}
                      />
                      <Label htmlFor="drought-low">Low (Frequent watering required)</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNextTab} className="ml-auto">
                  Next: Plant Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-0" id="preferences-tab">
            <Card>
              <CardHeader>
                <CardTitle>Plant Preferences</CardTitle>
                <CardDescription>
                  Specify your preferences for the type of plants you&apos;re looking for.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="plant-height" className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-indigo-500" />
                      Maximum Plant Height
                    </Label>
                    <span className="text-sm font-medium">{plantHeight[0]} cm</span>
                  </div>
                  <Slider
                    id="plant-height"
                    defaultValue={plantHeight}
                    max={500}
                    min={10}
                    step={10}
                    value={plantHeight}
                    onValueChange={setPlantHeight}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Small (10cm)</span>
                    <span>Medium (100cm)</span>
                    <span>Large (500cm)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-500" />
                    Plant Type (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="type-any"
                        checked={plantType.includes("any")}
                        onCheckedChange={() => handleCheckboxChange("any", plantType, setPlantType)}
                      />
                      <Label htmlFor="type-any">Any type</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="type-tree"
                        checked={plantType.includes("tree")}
                        onCheckedChange={() => handleCheckboxChange("tree", plantType, setPlantType)}
                      />
                      <Label htmlFor="type-tree">Tree</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="type-shrub"
                        checked={plantType.includes("shrub")}
                        onCheckedChange={() => handleCheckboxChange("shrub", plantType, setPlantType)}
                      />
                      <Label htmlFor="type-shrub">Shrub</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="type-flower"
                        checked={plantType.includes("flower")}
                        onCheckedChange={() => handleCheckboxChange("flower", plantType, setPlantType)}
                      />
                      <Label htmlFor="type-flower">Flower</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="type-grass"
                        checked={plantType.includes("grass")}
                        onCheckedChange={() => handleCheckboxChange("grass", plantType, setPlantType)}
                      />
                      <Label htmlFor="type-grass">Grass or Groundcover</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="type-herb"
                        checked={plantType.includes("herb")}
                        onCheckedChange={() => handleCheckboxChange("herb", plantType, setPlantType)}
                      />
                      <Label htmlFor="type-herb">Herb</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="type-vine"
                        checked={plantType.includes("vine")}
                        onCheckedChange={() => handleCheckboxChange("vine", plantType, setPlantType)}
                      />
                      <Label htmlFor="type-vine">Vine</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="type-fern"
                        checked={plantType.includes("fern")}
                        onCheckedChange={() => handleCheckboxChange("fern", plantType, setPlantType)}
                      />
                      <Label htmlFor="type-fern">Fern</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("environmental")}>
                  Back: Environmental Conditions
                </Button>
                <Button onClick={handleNextTab}>Next: Maintenance Levels</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="socioeconomic" className="mt-0" id="socioeconomic-tab">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Levels</CardTitle>
                <CardDescription>Specify your maintenance preferences for your green facade.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-slate-500" />
                    Maintenance Level (Select all that apply)
                  </Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="maintenance-any"
                        checked={maintenanceLevel.includes("any")}
                        onCheckedChange={() => handleCheckboxChange("any", maintenanceLevel, setMaintenanceLevel)}
                      />
                      <Label htmlFor="maintenance-any">Any maintenance level</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="maintenance-low"
                        checked={maintenanceLevel.includes("low")}
                        onCheckedChange={() => handleCheckboxChange("low", maintenanceLevel, setMaintenanceLevel)}
                      />
                      <Label htmlFor="maintenance-low">Low (Minimal care required)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="maintenance-moderate"
                        checked={maintenanceLevel.includes("moderate")}
                        onCheckedChange={() => handleCheckboxChange("moderate", maintenanceLevel, setMaintenanceLevel)}
                      />
                      <Label htmlFor="maintenance-moderate">Moderate (Regular care needed)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="maintenance-high"
                        checked={maintenanceLevel.includes("high")}
                        onCheckedChange={() => handleCheckboxChange("high", maintenanceLevel, setMaintenanceLevel)}
                      />
                      <Label htmlFor="maintenance-high">High (Frequent attention required)</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Additional Considerations</h3>

                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Low Maintenance Benefits</h4>
                    <ul className="text-xs space-y-1 list-disc pl-4 text-muted-foreground">
                      <li>Reduced water consumption</li>
                      <li>Lower labor costs</li>
                      <li>Fewer resources needed for upkeep</li>
                      <li>More sustainable in the long term</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("preferences")}>
                  Back: Plant Preferences
                </Button>
                <Button onClick={handleNextTab}>Next: Ecological Conditions</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="ecological" className="mt-0" id="ecological-tab">
            <Card>
              <CardHeader>
                <CardTitle>Ecological and Biodiversity Conditions</CardTitle>
                <CardDescription>Specify your preferences for supporting local fauna and biodiversity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="threatened-fauna"
                      checked={supportThreatenedFauna}
                      onCheckedChange={(checked) => setSupportThreatenedFauna(checked === true)}
                    />
                    <Label htmlFor="threatened-fauna" className="flex items-center gap-2">
                      <Bug className="h-4 w-4 text-orange-500" />
                      Prioritize plants that support threatened fauna species
                    </Label>
                  </div>

                  <div className="pl-6 mt-2">
                    <p className="text-xs text-muted-foreground mb-2">
                      Several plant species in our database provide critical habitat and food sources for threatened
                      fauna in the Netherlands. Selecting this option will prioritize these plants in your results.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Bug className="h-4 w-4 text-purple-500" />
                    Fauna Type to Support (Select all that apply)
                  </Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fauna-any"
                        checked={faunaType.includes("any")}
                        onCheckedChange={() => handleCheckboxChange("any", faunaType, setFaunaType)}
                      />
                      <Label htmlFor="fauna-any">Any fauna</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fauna-pollinators"
                        checked={faunaType.includes("pollinators")}
                        onCheckedChange={() => handleCheckboxChange("pollinators", faunaType, setFaunaType)}
                      />
                      <Label htmlFor="fauna-pollinators">Pollinators (Bees, Butterflies, Moths)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fauna-birds"
                        checked={faunaType.includes("birds")}
                        onCheckedChange={() => handleCheckboxChange("birds", faunaType, setFaunaType)}
                      />
                      <Label htmlFor="fauna-birds">Birds</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fauna-amphibians"
                        checked={faunaType.includes("amphibians")}
                        onCheckedChange={() => handleCheckboxChange("amphibians", faunaType, setFaunaType)}
                      />
                      <Label htmlFor="fauna-amphibians">Amphibians</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fauna-mammals"
                        checked={faunaType.includes("small-mammals")}
                        onCheckedChange={() => handleCheckboxChange("small-mammals", faunaType, setFaunaType)}
                      />
                      <Label htmlFor="fauna-mammals">Small Mammals</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                  <h3 className="text-sm font-medium mb-2">Biodiversity Benefits</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Creating habitats that support diverse wildlife has numerous benefits:
                  </p>
                  <ul className="text-xs space-y-1 list-disc pl-4 text-muted-foreground">
                    <li>Increased ecosystem resilience</li>
                    <li>Natural pest control</li>
                    <li>Improved pollination for gardens and crops</li>
                    <li>Conservation of threatened species</li>
                    <li>Enhanced urban biodiversity</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("socioeconomic")}>
                  Back: Maintenance Levels
                </Button>
                <Button onClick={handleSearch} disabled={loading}>
                  <Search className="mr-2 h-4 w-4" />
                  {loading ? "Searching..." : "Find Plants"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {showResults && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Recommended Plants</CardTitle>
                <CardDescription>Based on your selected criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedPlants.map((plant) => (
                    <div key={plant.id}>
                      <PlantRecommendationCard
                        name={plant.commonName}
                        scientificName={plant.scientificName}
                        imageUrl={plant.imageUrl || "/placeholder.svg?height=200&width=200"}
                        matchScore={plant.matchScore || 80}
                        characteristics={[
                          { label: "Type", value: plant.type },
                          { label: "Height", value: `${plant.height}cm` },
                          { label: "Sun", value: plant.sunExposure },
                          { label: "Wind", value: plant.windResistance },
                          { label: "Drought", value: plant.droughtResistant ? "Resistant" : "Not resistant" },
                          { label: "Biodiversity", value: plant.biodiversityValue },
                        ]}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" onClick={() => setShowResults(false)} className="w-full sm:w-auto">
                  Modify Criteria
                </Button>
                <Button className="w-full sm:w-auto" asChild>
                  <Link href={getFacadePreviewUrl}>
                    <Leaf className="mr-2 h-4 w-4" />
                    View on Green Facade
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
