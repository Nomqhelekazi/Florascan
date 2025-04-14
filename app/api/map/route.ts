import { NextResponse } from "next/server"
import { netherlandsCities, climateZones, rotterdamRegions } from "@/lib/map-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  if (type === "cities") {
    return NextResponse.json(netherlandsCities)
  } else if (type === "climate-zones") {
    return NextResponse.json(climateZones)
  } else if (type === "rotterdam-regions") {
    return NextResponse.json(rotterdamRegions)
  } else {
    // Return all data if no specific type is requested
    return NextResponse.json({
      cities: netherlandsCities,
      climateZones: climateZones,
      rotterdamRegions: rotterdamRegions,
    })
  }
}
