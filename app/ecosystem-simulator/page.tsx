"use client"

import { useState, useEffect, useRef } from "react"
import { Search, ChevronDown } from "lucide-react"
import { fetchPlants } from "@/lib/api"
import type { Plant } from "@/lib/types"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function EcosystemFacadeSimulator() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [selectedPlants, setSelectedPlants] = useState<Plant[]>([])
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [viewMode, setViewMode] = useState("realistic")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("select-plants")

  const facadeRef = useRef<HTMLDivElement>(null)

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
    // Filter plants based on search term and category
    let filtered = plants

    if (searchTerm) {
      filtered = filtered.filter(
        (plant) =>
          plant.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (activeCategory !== "All") {
      filtered = filtered.filter((plant) => {
        const type = plant.type?.toLowerCase() || ""

        switch (activeCategory) {
          case "Climbers":
            return type.includes("climber") || type.includes("vine")
          case "Perennials":
            return type.includes("perennial")
          case "Trees":
            return type.includes("tree")
          case "Aquatics":
            return type.includes("aquatic") || type.includes("water")
          case "Shrubs":
            return type.includes("shrub")
          case "Herbs":
            return type.includes("herb")
          case "Bulbs":
            return type.includes("bulb")
          default:
            return true
        }
      })
    }

    setFilteredPlants(filtered)
  }, [searchTerm, activeCategory, plants])

  const togglePlantSelection = (plant: Plant) => {
    if (selectedPlants.some((p) => p.id === plant.id)) {
      setSelectedPlants(selectedPlants.filter((p) => p.id !== plant.id))
    } else {
      setSelectedPlants([...selectedPlants, plant])
    }
  }

  const categories = ["All", "Climbers", "Perennials", "Trees", "Aquatics", "Shrubs", "Herbs", "Bulbs"]

  return (
    <div className="min-h-screen bg-[#e8f5ea] py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2d582a] mb-2">Ecosystem Facade Simulator</h1>
          <p className="text-[#4b6f49] max-w-3xl mx-auto">
            Discover how your green facade wall can enhance biodiversity and improve your environment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Plant Selection */}
          <Card className="bg-white p-4 rounded-lg">
            <div className="border-b pb-2 mb-4">
              <div className="flex space-x-2">
                <Button
                  variant={activeTab === "select-plants" ? "default" : "outline"}
                  onClick={() => setActiveTab("select-plants")}
                  className="flex-1 bg-[#2d582a] hover:bg-[#224221] text-white"
                >
                  Select Plants
                </Button>
                <Button
                  variant={activeTab === "view-benefits" ? "default" : "outline"}
                  onClick={() => setActiveTab("view-benefits")}
                  className="flex-1"
                >
                  View Benefits
                </Button>
              </div>
            </div>

            {activeTab === "select-plants" ? (
              <>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Search plants..."
                    className="pl-10 w-full border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                      className={activeCategory === category ? "bg-[#2d582a] text-white" : ""}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {loading ? (
                    <div className="py-4 text-center">Loading plants...</div>
                  ) : filteredPlants.length === 0 ? (
                    <div className="py-4 text-center">No plants found matching your criteria</div>
                  ) : (
                    filteredPlants.slice(0, 10).map((plant) => (
                      <div
                        key={plant.id}
                        className={`p-3 rounded-md cursor-pointer border hover:bg-gray-50 transition-colors ${
                          selectedPlants.some((p) => p.id === plant.id)
                            ? "border-[#2d582a] bg-[#e8f5ea]"
                            : "border-gray-200"
                        }`}
                        onClick={() => togglePlantSelection(plant)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{plant.commonName}</h3>
                            <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
                          </div>
                          <ChevronDown size={16} className="text-gray-400" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="py-4">
                <h3 className="font-medium text-lg mb-3">Benefits of Selected Plants</h3>
                {selectedPlants.length === 0 ? (
                  <p className="text-gray-500">Select plants to see their benefits</p>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-[#e8f5ea] rounded-md">
                      <h4 className="font-medium mb-1">Biodiversity Impact</h4>
                      <p className="text-sm">
                        Your selected plants support {selectedPlants.length * 2} different species of insects and birds.
                      </p>
                    </div>

                    <div className="p-3 bg-[#e8f5ea] rounded-md">
                      <h4 className="font-medium mb-1">Climate Benefits</h4>
                      <p className="text-sm">
                        This combination can reduce ambient temperature by approximately 3-5°C in summer.
                      </p>
                    </div>

                    <div className="p-3 bg-[#e8f5ea] rounded-md">
                      <h4 className="font-medium mb-1">Water Management</h4>
                      <p className="text-sm">Can absorb up to 60% of rainfall, reducing runoff and flood risk.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Right Panel - Facade Visualization */}
          <Card className="bg-white p-4 rounded-lg">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Facade Visualization</h2>
              <Tabs value={viewMode} onValueChange={setViewMode}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="realistic">Realistic</TabsTrigger>
                  <TabsTrigger value="schematic">Schematic</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="relative border rounded-md overflow-hidden" style={{ height: "400px" }}>
              <div
                ref={facadeRef}
                className="absolute inset-0 bg-[#e8d2b9] bg-opacity-90"
                style={{
                  backgroundImage: "url('/images/brick-wall-pattern.png')",
                  backgroundSize: "contain",
                  backgroundRepeat: "repeat",
                }}
              >
                {selectedPlants.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-center p-4 text-gray-500">
                    Select plants to visualize your green facade
                  </div>
                )}

                {/* Plant visualization would go here */}
                {selectedPlants.map((plant, index) => {
                  // Calculate position for each plant
                  const segmentWidth = 100 / Math.min(selectedPlants.length, 3)
                  const segmentIndex = index % 3
                  const row = Math.floor(index / 3)

                  return (
                    <div
                      key={plant.id}
                      className="absolute"
                      style={{
                        left: `${segmentIndex * segmentWidth}%`,
                        width: `${segmentWidth}%`,
                        top: `${row * 50}%`,
                        height: "50%",
                        opacity: viewMode === "schematic" ? 0.7 : 1,
                      }}
                    >
                      {plant.imageUrl ? (
                        <div
                          className="w-full h-full bg-contain bg-no-repeat bg-center"
                          style={{
                            backgroundImage: `url(${plant.imageUrl})`,
                            filter: viewMode === "schematic" ? "saturate(0.5) contrast(1.2)" : "none",
                          }}
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{
                            backgroundColor: viewMode === "schematic" ? "#88a97c" : "rgba(136, 169, 124, 0.6)",
                          }}
                        >
                          {plant.commonName}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-3">
              This visualization shows how your selected plants would appear on a facade wall based on the coverage
              percentages you've chosen. Toggle between realistic and schematic views to see different representations.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
