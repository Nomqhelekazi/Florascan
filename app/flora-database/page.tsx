"use client"

import { useState, useEffect } from "react"
import { Loader2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlantCard } from "@/components/plant-card"
import { fetchPlants } from "@/lib/api"
import type { Plant } from "@/lib/types"

export default function FloraDatabase() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    type: "",
    growthSpeed: "",
    nativeStatus: "",
    lifespan: "",
    biodiversityValue: "",
  })

  useEffect(() => {
    const loadPlants = async () => {
      try {
        const data = await fetchPlants()
        setPlants(data)
        setFilteredPlants(data)
      } catch (error) {
        console.error("Failed to fetch plants:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPlants()
  }, [])

  useEffect(() => {
    let result = plants

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (plant) => plant.commonName.toLowerCase().includes(term) || plant.scientificName.toLowerCase().includes(term),
      )
    }

    // Apply dropdown filters
    if (filters.type) {
      result = result.filter((plant) => plant.type === filters.type)
    }
    if (filters.growthSpeed) {
      result = result.filter((plant) => plant.growthSpeed === filters.growthSpeed)
    }
    if (filters.nativeStatus) {
      result = result.filter((plant) => plant.nativeStatus === filters.nativeStatus)
    }
    if (filters.lifespan) {
      result = result.filter((plant) => plant.lifespan === filters.lifespan)
    }
    if (filters.biodiversityValue) {
      result = result.filter((plant) => plant.biodiversityValue === filters.biodiversityValue)
    }

    setFilteredPlants(result)
  }, [searchTerm, filters, plants])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setFilters({
      type: "",
      growthSpeed: "",
      nativeStatus: "",
      lifespan: "",
      biodiversityValue: "",
    })
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flora Database</h1>
          <p className="text-muted-foreground mt-2">
            Explore our comprehensive database of 120+ plant species with detailed information on growth
            characteristics, environmental preferences, and ecological benefits. Use advanced filters to find specific
            plants.
          </p>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search plants..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Filter Plants</CardTitle>
              <CardDescription>Narrow down your search by selecting specific plant characteristics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Plant Type</Label>
                  <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="tree">Tree</SelectItem>
                      <SelectItem value="shrub">Shrub</SelectItem>
                      <SelectItem value="flower">Flower</SelectItem>
                      <SelectItem value="grass">Grass</SelectItem>
                      <SelectItem value="herb">Herb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="growthSpeed">Growth Speed</Label>
                  <Select
                    value={filters.growthSpeed}
                    onValueChange={(value) => handleFilterChange("growthSpeed", value)}
                  >
                    <SelectTrigger id="growthSpeed">
                      <SelectValue placeholder="Any speed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any speed</SelectItem>
                      <SelectItem value="slow">Slow</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="fast">Fast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nativeStatus">Native Status</Label>
                  <Select
                    value={filters.nativeStatus}
                    onValueChange={(value) => handleFilterChange("nativeStatus", value)}
                  >
                    <SelectTrigger id="nativeStatus">
                      <SelectValue placeholder="Any status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any status</SelectItem>
                      <SelectItem value="native">Native</SelectItem>
                      <SelectItem value="non-native">Non-native</SelectItem>
                      <SelectItem value="invasive">Invasive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lifespan">Lifespan</Label>
                  <Select value={filters.lifespan} onValueChange={(value) => handleFilterChange("lifespan", value)}>
                    <SelectTrigger id="lifespan">
                      <SelectValue placeholder="Any lifespan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any lifespan</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="biennial">Biennial</SelectItem>
                      <SelectItem value="perennial">Perennial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biodiversityValue">Biodiversity Value</Label>
                  <Select
                    value={filters.biodiversityValue}
                    onValueChange={(value) => handleFilterChange("biodiversityValue", value)}
                  >
                    <SelectTrigger id="biodiversityValue">
                      <SelectValue placeholder="Any value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any value</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={clearFilters} className="ml-auto">
                Clear Filters
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Loading plants...</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredPlants.length} of {plants.length} plants
                  </p>
                </div>

                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredPlants.length > 0 ? (
                      filteredPlants.map((plant) => <PlantCard key={plant.id} plant={plant} />)
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground">No plants found matching your criteria.</p>
                        <Button variant="link" onClick={clearFilters} className="mt-2">
                          Clear all filters
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="list" className="mt-0">
                  <div className="space-y-4">
                    {filteredPlants.length > 0 ? (
                      filteredPlants.map((plant) => (
                        <Card key={plant.id}>
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-48 h-48 overflow-hidden">
                              <img
                                src={plant.imageUrl || `/placeholder.svg?height=200&width=200`}
                                alt={plant.commonName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <h3 className="text-lg font-semibold">{plant.commonName}</h3>
                              <p className="text-sm italic text-muted-foreground">{plant.scientificName}</p>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                <div>
                                  <p className="text-sm font-medium">Type:</p>
                                  <p className="text-sm">{plant.type}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Growth Speed:</p>
                                  <p className="text-sm">{plant.growthSpeed}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Native Status:</p>
                                  <p className="text-sm">{plant.nativeStatus}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Lifespan:</p>
                                  <p className="text-sm">{plant.lifespan}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Biodiversity Value:</p>
                                  <p className="text-sm">{plant.biodiversityValue}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Drought Resistant:</p>
                                  <p className="text-sm">{plant.droughtResistant ? "Yes" : "No"}</p>
                                </div>
                              </div>
                              {plant.description && (
                                <p className="text-sm mt-2 text-muted-foreground line-clamp-2">{plant.description}</p>
                              )}
                              <Button variant="outline" className="mt-4" asChild>
                                <a href={`/flora-database/${plant.id}`}>View Detailed Information</a>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No plants found matching your criteria.</p>
                        <Button variant="link" onClick={clearFilters} className="mt-2">
                          Clear all filters
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  )
}
