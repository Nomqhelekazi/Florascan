"use client"

import { useState, useEffect } from "react"
import { Search, Loader2, MapPin, Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { fetchPlants } from "@/lib/api"
import type { Plant } from "@/lib/types"
import { useSearchParams } from "next/navigation"
import { rotterdamClimateZones } from "@/lib/climate-data"

export default function FloraGallery() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterGrowthSpeed, setFilterGrowthSpeed] = useState("all")
  const [filterNativeStatus, setFilterNativeStatus] = useState("all")
  const [filterLifespan, setFilterLifespan] = useState("all")
  const [filterBiodiversityValue, setFilterBiodiversityValue] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const plantsPerPage = 20

  const searchParams = useSearchParams()
  const areaParam = searchParams.get("area")

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

    // Apply type filter
    if (filterType !== "all") {
      result = result.filter((plant) => plant.type === filterType)
    }

    // Apply growth speed filter
    if (filterGrowthSpeed !== "all") {
      result = result.filter((plant) => plant.growthSpeed === filterGrowthSpeed)
    }

    // Apply native status filter
    if (filterNativeStatus !== "all") {
      result = result.filter((plant) => plant.nativeStatus === filterNativeStatus)
    }

    // Apply lifespan filter
    if (filterLifespan !== "all") {
      result = result.filter((plant) => plant.lifespan === filterLifespan)
    }

    // Apply biodiversity value filter
    if (filterBiodiversityValue !== "all") {
      result = result.filter((plant) => plant.biodiversityValue === filterBiodiversityValue)
    }

    // Apply area filter if coming from climate map
    if (areaParam) {
      const selectedZone = rotterdamClimateZones.find((zone) => zone.id === areaParam)
      if (selectedZone) {
        // Filter plants based on the climate zone's conditions
        result = result.filter((plant) => {
          // Temperature compatibility
          let tempCompatible = true
          if (plant.temperatureTolerance) {
            tempCompatible =
              plant.temperatureTolerance.min <= selectedZone.temperature.max &&
              plant.temperatureTolerance.max >= selectedZone.temperature.min
          }

          // Wind resistance compatibility
          let windCompatible = true
          if (plant.windResistance) {
            const windMap: Record<string, number> = {
              low: 1,
              medium: 3,
              high: 5,
            }
            const plantWindValue = windMap[plant.windResistance.toLowerCase()] || 3
            windCompatible = Math.abs(plantWindValue - selectedZone.windExposure) <= 1
          }

          // Sun exposure compatibility
          let sunCompatible = true
          if (plant.sunExposure) {
            const sunMap: Record<string, number> = {
              shade: 1,
              partial: 3,
              full: 5,
            }
            const plantSunValue = sunMap[plant.sunExposure.toLowerCase()] || 3
            sunCompatible = Math.abs(plantSunValue - selectedZone.sunExposure) <= 1
          }

          return tempCompatible && windCompatible && sunCompatible
        })
      }
    }

    setFilteredPlants(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [
    searchTerm,
    filterType,
    filterGrowthSpeed,
    filterNativeStatus,
    filterLifespan,
    filterBiodiversityValue,
    plants,
    areaParam,
  ])

  // Get unique plant types for filter dropdown
  const plantTypes = Array.from(new Set(plants.map((plant) => plant.type)))
  const growthSpeeds = Array.from(new Set(plants.map((plant) => plant.growthSpeed)))
  const nativeStatuses = Array.from(new Set(plants.map((plant) => plant.nativeStatus)))
  const lifespans = Array.from(new Set(plants.map((plant) => plant.lifespan)))
  const biodiversityValues = Array.from(new Set(plants.map((plant) => plant.biodiversityValue)))

  // Calculate pagination
  const indexOfLastPlant = currentPage * plantsPerPage
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage
  const currentPlants = filteredPlants.slice(indexOfFirstPlant, indexOfLastPlant)
  const totalPages = Math.ceil(filteredPlants.length / plantsPerPage)

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setFilterType("all")
    setFilterGrowthSpeed("all")
    setFilterNativeStatus("all")
    setFilterLifespan("all")
    setFilterBiodiversityValue("all")
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flora Gallery</h1>
          <p className="text-muted-foreground mt-2">
            Explore our comprehensive database of 120+ plant species with detailed information on growth
            characteristics, environmental preferences, and ecological benefits.
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-green-600 dark:text-green-400" />
              <h2 className="text-lg font-medium">Browse Plants</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search plants..."
                  className="pl-8 w-full border-green-200 dark:border-green-800 focus-visible:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-10 w-10 bg-green-600 hover:bg-green-700 text-white"
                >
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
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`h-10 w-10 ${viewMode === "list" ? "bg-green-600 hover:bg-green-700 text-white" : "border-green-200 dark:border-green-800 text-green-600 dark:text-green-400"}`}
                >
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
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-green-700 dark:text-green-400">
                Plant Type
              </label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger id="type" className="border-green-200 dark:border-green-800">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {plantTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="growthSpeed" className="text-sm font-medium text-green-700 dark:text-green-400">
                Growth Speed
              </label>
              <Select value={filterGrowthSpeed} onValueChange={setFilterGrowthSpeed}>
                <SelectTrigger id="growthSpeed" className="border-green-200 dark:border-green-800">
                  <SelectValue placeholder="Any speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any speed</SelectItem>
                  {growthSpeeds.map((speed) => (
                    <SelectItem key={speed} value={speed}>
                      {speed.charAt(0).toUpperCase() + speed.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="nativeStatus" className="text-sm font-medium text-green-700 dark:text-green-400">
                Native Status
              </label>
              <Select value={filterNativeStatus} onValueChange={setFilterNativeStatus}>
                <SelectTrigger id="nativeStatus" className="border-green-200 dark:border-green-800">
                  <SelectValue placeholder="Any status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any status</SelectItem>
                  {nativeStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="lifespan" className="text-sm font-medium text-green-700 dark:text-green-400">
                Lifespan
              </label>
              <Select value={filterLifespan} onValueChange={setFilterLifespan}>
                <SelectTrigger id="lifespan" className="border-green-200 dark:border-green-800">
                  <SelectValue placeholder="Any lifespan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any lifespan</SelectItem>
                  {lifespans.map((lifespan) => (
                    <SelectItem key={lifespan} value={lifespan}>
                      {lifespan.charAt(0).toUpperCase() + lifespan.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="biodiversityValue" className="text-sm font-medium text-green-700 dark:text-green-400">
                Biodiversity Value
              </label>
              <Select value={filterBiodiversityValue} onValueChange={setFilterBiodiversityValue}>
                <SelectTrigger id="biodiversityValue" className="border-green-200 dark:border-green-800">
                  <SelectValue placeholder="Any value" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any value</SelectItem>
                  {biodiversityValues.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </div>

        {areaParam && (
          <div className="w-full bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4 border border-green-200 dark:border-green-800">
            <p className="text-sm flex items-center text-green-700 dark:text-green-400">
              <MapPin className="h-4 w-4 mr-2 text-green-600" />
              Showing plants compatible with{" "}
              <span className="font-medium mx-1">
                {rotterdamClimateZones.find((zone) => zone.id === areaParam)?.name || "selected climate zone"}
              </span>
              <Button
                variant="link"
                className="p-0 h-auto text-green-600 dark:text-green-400"
                onClick={() => (window.location.href = "/flora-gallery")}
              >
                Clear area filter
              </Button>
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            <span className="ml-2 text-green-600">Loading plants...</span>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Showing {currentPlants.length} of {filteredPlants.length} plants
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {currentPlants.length > 0 ? (
                  currentPlants.map((plant) => (
                    <Card
                      key={plant.id}
                      className="overflow-hidden hover:shadow-md transition-shadow duration-200 border-green-100 dark:border-green-900"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={
                            plant.imageUrl ||
                            `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(plant.commonName) || "/placeholder.svg"}`
                          }
                          alt={plant.commonName}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
                          >
                            {plant.type}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h2 className="font-semibold text-lg line-clamp-1">{plant.commonName}</h2>
                        <p className="text-sm italic text-muted-foreground line-clamp-1">{plant.scientificName}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                            {plant.nativeStatus}
                          </span>
                          <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full">
                            {plant.biodiversityValue}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          variant="outline"
                          className="w-full border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                          asChild
                        >
                          <a href={`/flora-gallery/${plant.id}`}>View Details</a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No plants found matching your criteria.</p>
                    <Button variant="link" onClick={clearFilters} className="mt-2 text-green-600 dark:text-green-400">
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 mt-4">
                {currentPlants.length > 0 ? (
                  currentPlants.map((plant) => (
                    <Card
                      key={plant.id}
                      className="border-green-100 dark:border-green-900 hover:shadow-md transition-shadow duration-200"
                    >
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
                              <p className="text-sm font-medium text-green-700 dark:text-green-400">Type:</p>
                              <p className="text-sm">{plant.type}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-green-700 dark:text-green-400">Growth Speed:</p>
                              <p className="text-sm">{plant.growthSpeed}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-green-700 dark:text-green-400">Native Status:</p>
                              <p className="text-sm">{plant.nativeStatus}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-green-700 dark:text-green-400">Lifespan:</p>
                              <p className="text-sm">{plant.lifespan}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                                Biodiversity Value:
                              </p>
                              <p className="text-sm">{plant.biodiversityValue}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                                Drought Resistant:
                              </p>
                              <p className="text-sm">{plant.droughtResistant ? "Yes" : "No"}</p>
                            </div>
                          </div>
                          {plant.description && (
                            <p className="text-sm mt-2 text-muted-foreground line-clamp-2">{plant.description}</p>
                          )}
                          <Button
                            variant="outline"
                            className="mt-4 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                            asChild
                          >
                            <a href={`/flora-gallery/${plant.id}`}>View Detailed Information</a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No plants found matching your criteria.</p>
                    <Button variant="link" onClick={clearFilters} className="mt-2 text-green-600 dark:text-green-400">
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            )}

            {filteredPlants.length > plantsPerPage && (
              <div className="flex justify-center mt-6 gap-2">
                <Button
                  variant="outline"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show 5 page numbers centered around current page
                    let pageNum = currentPage - 2 + i
                    if (currentPage < 3) {
                      pageNum = i + 1
                    } else if (currentPage > totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    }

                    if (pageNum > 0 && pageNum <= totalPages) {
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          className={`w-10 h-10 p-0 ${
                            currentPage === pageNum
                              ? "bg-green-600 hover:bg-green-700"
                              : "border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                          }`}
                          onClick={() => paginate(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      )
                    }
                    return null
                  })}
                </div>
                <Button
                  variant="outline"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
