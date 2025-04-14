"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnvironmentalChart } from "@/components/environmental-chart"
import { BarChart3, Leaf, Bug, Settings } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function EnvironmentalDataPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Environmental Parameter Framework</h1>
        <p className="text-muted-foreground">
          Understand the key factors that influence biodiversity in urban environments.
        </p>
      </div>

      <Tabs defaultValue="physical" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="physical" className="w-full">
            <BarChart3 className="mr-2 h-4 w-4" />
            Physical Framework
          </TabsTrigger>
          <TabsTrigger value="biological" className="w-full">
            <Leaf className="mr-2 h-4 w-4" />
            Biological & Ecological Framework
          </TabsTrigger>
          <TabsTrigger value="socioeconomic" className="w-full">
            <Settings className="mr-2 h-4 w-4" />
            Socio-Economic Framework
          </TabsTrigger>
        </TabsList>

        <TabsContent value="physical" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Physical Environmental Factors</CardTitle>
              <CardDescription>
                Key climate and environmental conditions affecting Rotterdam's biodiversity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-[400px]">
                <EnvironmentalChart />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Temperature</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      The region experiences a temperate maritime climate with average temperatures ranging from 2.5°C
                      in winter to 19°C in summer. Climate change is causing more extreme temperature fluctuations,
                      affecting plant growth cycles and fauna behavior.
                    </p>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Sunlight</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      Daylight hours vary significantly throughout the year, from 8 hours in December to 16+ hours in
                      June. Urban structures create varied microclimates with different sun exposure levels, affecting
                      plant selection for wall facades.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-cyan-800 dark:text-cyan-300 mb-2">Wind</h3>
                    <p className="text-sm text-cyan-700 dark:text-cyan-400">
                      Coastal regions experience significant wind exposure, especially in winter months (5.5-6.5 m/s
                      average). Building height and orientation create wind tunnels and sheltered areas that must be
                      considered for plant selection.
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">Drought</h3>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      While the region receives consistent rainfall (60-90mm monthly), summer dry spells are becoming
                      more common. Vertical gardens must include drought-resistant species or efficient irrigation
                      systems to maintain biodiversity during dry periods.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biological" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Biological & Ecological Framework</CardTitle>
              <CardDescription>
                Understanding the biological data and ecological relationships in our database.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Leaf className="mr-2 h-5 w-5 text-green-600" />
                  Flora Data Attributes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Plant Type</h4>
                      <p className="text-sm text-muted-foreground">
                        Categorizes plants as trees, shrubs, flowers, grasses, herbs, vines, or ferns. This helps in
                        understanding their growth habits and ecological roles.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Growth Speed</h4>
                      <p className="text-sm text-muted-foreground">
                        Indicates how quickly a plant grows (slow, medium, fast). Important for planning and maintenance
                        considerations.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Native Status</h4>
                      <p className="text-sm text-muted-foreground">
                        Shows whether a plant is native, non-native, or invasive to the Netherlands. Native plants
                        typically support more local wildlife.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Lifespan</h4>
                      <p className="text-sm text-muted-foreground">
                        Classifies plants as annual, biennial, or perennial, indicating how long they live and their
                        lifecycle patterns.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Fauna Dependence</h4>
                      <p className="text-sm text-muted-foreground">
                        Lists the animal species that depend on this plant for food, shelter, or reproduction. Critical
                        for biodiversity planning.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Biodiversity Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Rates how well a plant supports overall ecosystem biodiversity (low, medium, high). Plants with
                        high ratings typically support more species.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Bug className="mr-2 h-5 w-5 text-purple-600" />
                  Fauna Data Attributes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Taxonomy</h4>
                      <p className="text-sm text-muted-foreground">
                        Scientific classification of animals (birds, insects, mammals, etc.). Helps understand their
                        evolutionary relationships and ecological roles.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Conservation Status</h4>
                      <p className="text-sm text-muted-foreground">
                        Indicates whether a species is threatened (least concern, near threatened, vulnerable,
                        endangered, critically endangered).
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Pollinator Role</h4>
                      <p className="text-sm text-muted-foreground">
                        Describes how an animal contributes to plant pollination, which is essential for plant
                        reproduction and ecosystem health.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Flora Dependence</h4>
                      <p className="text-sm text-muted-foreground">
                        Lists the plant species that this animal depends on for food, shelter, or reproduction. Shows
                        ecological interconnections.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Habitat Needs & Suitability</h4>
                      <p className="text-sm text-muted-foreground">
                        Describes the environmental conditions and habitats where this animal can thrive. Important for
                        conservation planning.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Seasonal Presence</h4>
                      <p className="text-sm text-muted-foreground">
                        Indicates when the animal is present in Rotterdam (year-round, seasonal, migratory). Helps
                        understand temporal patterns in biodiversity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Ecological Relationships</h3>
                <p className="text-sm text-purple-700 dark:text-purple-400 mb-3">
                  Understanding the complex relationships between plants, animals, and their environment is crucial for
                  creating sustainable wall facades:
                </p>
                <ul className="text-sm text-purple-700 dark:text-purple-400 list-disc pl-5 space-y-1">
                  <li>Plants provide food, shelter, and breeding sites for animals</li>
                  <li>Animals help with pollination, seed dispersal, and pest control</li>
                  <li>Diverse plant communities are more resilient to environmental stresses</li>
                  <li>Native plant-animal relationships have evolved over thousands of years</li>
                  <li>Urban green spaces serve as ecological corridors connecting larger habitats</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="socioeconomic" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Socio-Economic Framework</CardTitle>
              <CardDescription>
                Understanding the human and economic factors affecting biodiversity in Rotterdam.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-slate-600" />
                  Plant Maintenance Considerations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Maintenance Levels</h4>
                      <p className="text-sm text-muted-foreground">
                        Different plants require varying levels of care (low, moderate, high). Selecting appropriate
                        maintenance levels ensures long-term sustainability of wall facades.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Resource Requirements</h4>
                      <p className="text-sm text-muted-foreground">
                        Water, nutrients, and pruning needs vary by species. Efficient resource use is critical for
                        sustainable urban greening projects.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Economic Considerations</h4>
                      <p className="text-sm text-muted-foreground">
                        Initial installation costs versus long-term maintenance expenses. Low-maintenance native species
                        often provide better return on investment over time.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Skill Requirements</h4>
                      <p className="text-sm text-muted-foreground">
                        Different plant combinations require varying levels of horticultural expertise. Training and
                        knowledge transfer are important for successful implementation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Leaf className="mr-2 h-5 w-5 text-green-600" />
                  Conservation of Rotterdam Species
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Importance of Native Species</h4>
                      <p className="text-sm text-muted-foreground">
                        Native plants and animals have co-evolved and form the foundation of local ecosystems.
                        Preserving these relationships is crucial for maintaining biodiversity.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Threatened Species Protection</h4>
                      <p className="text-sm text-muted-foreground">
                        Several plant and animal species in Rotterdam are under threat due to urbanization and climate
                        change. Green facades can provide critical habitat for these species.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Urban Planning Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Incorporating biodiversity considerations into urban planning creates more resilient and livable
                        cities. Green facades are a key component of this approach.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Community Engagement</h4>
                      <p className="text-sm text-muted-foreground">
                        Involving local communities in biodiversity projects increases awareness, support, and long-term
                        success. Educational components should be integrated into facade projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">
                  Benefits of Biodiversity Conservation
                </h3>
                <p className="text-sm text-green-700 dark:text-green-400 mb-3">
                  Investing in biodiversity through green facades provides multiple benefits to Rotterdam:
                </p>
                <ul className="text-sm text-green-700 dark:text-green-400 list-disc pl-5 space-y-1">
                  <li>Improved air quality and reduced urban heat island effect</li>
                  <li>Enhanced stormwater management and reduced flooding risk</li>
                  <li>Increased property values and aesthetic appeal</li>
                  <li>Improved mental health and well-being for residents</li>
                  <li>Greater resilience to climate change impacts</li>
                  <li>Support for pollinators essential to urban agriculture</li>
                  <li>Preservation of local ecological heritage</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
