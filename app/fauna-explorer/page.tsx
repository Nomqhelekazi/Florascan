import type { Metadata } from "next"
import { getFaunaByType } from "@/lib/fauna-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Fauna Explorer | Biodiversity Scan",
  description: "Explore the diverse fauna and their interactions with local flora",
}

export default function FaunaExplorerPage() {
  // Group fauna by type
  const birds = getFaunaByType("bird")
  const insects = getFaunaByType("insect")
  const mammals = getFaunaByType("mammal")
  const others = getFaunaByType("other")

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Fauna Explorer</h1>
          <p className="text-gray-500 mb-6">
            Discover the diverse wildlife that inhabits urban ecosystems and their relationships with local flora.
          </p>
        </div>

        <Tabs defaultValue="birds">
          <TabsList className="mb-6">
            <TabsTrigger value="birds">Birds ({birds.length})</TabsTrigger>
            <TabsTrigger value="insects">Insects ({insects.length})</TabsTrigger>
            <TabsTrigger value="mammals">Mammals ({mammals.length})</TabsTrigger>
            <TabsTrigger value="others">Others ({others.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="birds" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {birds.map((animal) => (
                <Card key={animal.id} className="overflow-hidden">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={
                        animal.imageUrl ||
                        `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(animal.name) || "/placeholder.svg"}`
                      }
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{animal.name}</CardTitle>
                    <CardDescription className="italic">{animal.scientificName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{animal.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {animal.conservationStatus && (
                        <Badge className="bg-amber-600" variant="secondary">
                          {animal.conservationStatus}
                        </Badge>
                      )}
                      <Badge variant="outline" className="capitalize">
                        {animal.seasonalPresence}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {insects.map((animal) => (
                <Card key={animal.id} className="overflow-hidden">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={
                        animal.imageUrl ||
                        `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(animal.name) || "/placeholder.svg"}`
                      }
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{animal.name}</CardTitle>
                    <CardDescription className="italic">{animal.scientificName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{animal.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {animal.conservationStatus && (
                        <Badge className="bg-amber-600" variant="secondary">
                          {animal.conservationStatus}
                        </Badge>
                      )}
                      <Badge variant="outline" className="capitalize">
                        {animal.seasonalPresence}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mammals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mammals.map((animal) => (
                <Card key={animal.id} className="overflow-hidden">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={
                        animal.imageUrl ||
                        `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(animal.name) || "/placeholder.svg"}`
                      }
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{animal.name}</CardTitle>
                    <CardDescription className="italic">{animal.scientificName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{animal.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {animal.conservationStatus && (
                        <Badge className="bg-amber-600" variant="secondary">
                          {animal.conservationStatus}
                        </Badge>
                      )}
                      <Badge variant="outline" className="capitalize">
                        {animal.seasonalPresence}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="others" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((animal) => (
                <Card key={animal.id} className="overflow-hidden">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={
                        animal.imageUrl ||
                        `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(animal.name) || "/placeholder.svg"}`
                      }
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{animal.name}</CardTitle>
                    <CardDescription className="italic">{animal.scientificName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{animal.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {animal.conservationStatus && (
                        <Badge className="bg-amber-600" variant="secondary">
                          {animal.conservationStatus}
                        </Badge>
                      )}
                      <Badge variant="outline" className="capitalize">
                        {animal.seasonalPresence}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mt-8">
          <h2 className="text-xl font-semibold mb-3 text-green-800 dark:text-green-300">Fauna-Flora Relationships</h2>
          <p className="text-green-700 dark:text-green-400 mb-4">
            Rotterdam's biodiversity depends on the complex relationships between plants and animals. Here are some key
            interactions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">Pollinators</h3>
              <p className="text-sm text-green-700 dark:text-green-400 mb-2">
                Bees, butterflies, and other insects pollinate flowering plants, ensuring their reproduction and
                supporting the entire ecosystem.
              </p>
              <ul className="text-sm text-green-700 dark:text-green-400 list-disc pl-5 space-y-1">
                <li>Western Honey Bee (Apis mellifera) - Pollinates a wide variety of plants</li>
                <li>Speckled Wood (Pararge aegeria) - Important pollinator in woodland areas</li>
                <li>Red Admiral (Vanessa atalanta) - Migrant butterfly that pollinates late-blooming plants</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">Seed Dispersers</h3>
              <p className="text-sm text-green-700 dark:text-green-400 mb-2">
                Birds and mammals spread plant seeds, helping to maintain and expand plant populations.
              </p>
              <ul className="text-sm text-green-700 dark:text-green-400 list-disc pl-5 space-y-1">
                <li>European Robin (Erithacus rubecula) - Disperses seeds of berries and fruits</li>
                <li>Eurasian Jay (Garrulus glandarius) - Plants thousands of oak trees by burying acorns</li>
                <li>Grey Squirrel (Sciurus carolinensis) - Spreads tree seeds through caching behavior</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
