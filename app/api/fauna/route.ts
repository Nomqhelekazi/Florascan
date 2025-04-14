import { NextResponse } from "next/server"
import { fauna, getFaunaById, getFaunaByType } from "@/lib/fauna-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const type = searchParams.get("type")

  if (id) {
    const animal = getFaunaById(id)
    if (!animal) {
      return NextResponse.json({ error: "Fauna not found" }, { status: 404 })
    }
    return NextResponse.json(animal)
  }

  if (type) {
    const animals = getFaunaByType(type as any)
    return NextResponse.json(animals)
  }

  return NextResponse.json(fauna)
}
