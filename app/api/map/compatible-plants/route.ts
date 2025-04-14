import { NextResponse } from "next/server"
import { rotterdamRegions } from "@/lib/map-data"
import { fetchPlants } from "@/lib/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const regionId = searchParams.get("regionId")

  if (!regionId) {
    return NextResponse.json({ error: "Region ID is required" }, { status: 400 })
  }

  const region = rotterdamRegions.find((r) => r.id === regionId)

  if (!region) {
    return NextResponse.json({ error: "Region not found" }, { status: 404 })
  }

  // Get all plants
  const allPlants = await fetchPlants()

  // Filter plants that are compatible with this region
  const compatiblePlants = allPlants.filter((plant) => region.compatiblePlants.includes(plant.id))

  return NextResponse.json({
    region,
    plants: compatiblePlants,
  })
}
