import { fetchPlantById } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function PlantDetailPage({ params }: { params: { id: string } }) {
  const plant = await fetchPlantById(params.id)

  if (!plant) {
    return <div className="container mx-auto p-4">Plant not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="sticky top-20">
            <div className="rounded-lg overflow-hidden mb-4">
              <img
                src={plant.imageUrl || "/placeholder.svg?height=300&width=300"}
                alt={plant.commonName}
                className="w-full h-auto object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold mb-2">{plant.commonName}</h1>
            <p className="text-gray-500 italic mb-4">{plant.scientificName}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{plant.type}</Badge>
              <Badge variant="outline">{plant.nativeStatus}</Badge>
              <Badge variant="secondary">{plant.lifespan}</Badge>
              {plant.maintenanceLevel && (
                <Badge variant="outline" className="capitalize">
                  {plant.maintenanceLevel} maintenance
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Biodiversity Value</h3>
                <p>{plant.biodiversityValue}</p>
              </div>

              <div>
                <h3 className="font-semibold">Growth Speed</h3>
                <p>{plant.growthSpeed}</p>
              </div>

              <div>
                <h3 className="font-semibold">Height</h3>
                <p>{plant.height} cm</p>
              </div>

              <div>
                <h3 className="font-semibold">Growing Conditions</h3>
                <ul className="list-disc list-inside">
                  <li>Sun Exposure: {plant.sunExposure}</li>
                  <li>Wind Resistance: {plant.windResistance}</li>
                  <li>Drought Resistant: {plant.droughtResistant ? "Yes" : "No"}</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Seasonal Information</h3>
                <ul className="list-disc list-inside">
                  <li>Blooming Season: {plant.bloomingSeason}</li>
                  {plant.dormancyPeriod && <li>Dormancy Period: {plant.dormancyPeriod}</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="description">
            <TabsList className="mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ecological">Ecological Benefits</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p>{plant.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ecological" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  {plant.ecologicalBenefits ? (
                    <ul className="list-disc list-inside space-y-2">
                      {plant.ecologicalBenefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No ecological benefits information available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
