import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Flora Scan | Sustainable Urban Ecosystems",
  description: "Explore biodiversity and build sustainable wall facades with native flora.",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#000)] dark:bg-[linear-gradient(to_right,#303030_1px,transparent_1px),linear-gradient(to_bottom,#303030_1px,transparent_1px)]"></div>

        <div className="container relative z-10 px-4 py-24 md:py-32 lg:py-40 mx-auto">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex flex-col max-w-3xl">
              <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary w-fit">
                <Leaf className="w-4 h-4 mr-2" />
                Flora Scan
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-gray-900 dark:text-white">
                Build sustainable <span className="text-primary">green facades</span>
              </h1>

              <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                Discover diverse plant species and create living wall facades that enhance urban environments, support
                local biodiversity, and improve air quality.
              </p>

              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="text-white bg-primary hover:bg-primary/90 shadow-md" asChild>
                  <Link href="/interactive-tools/find-plant">
                    Build Your Facade <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                  asChild
                >
                  <Link href="/flora-gallery">Explore Flora Gallery</Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/90"></div>

              {/* Subtle Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMzAgMEw2MCAzMEwzMCA2MEwwIDMwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmMjAiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]"></div>

              {/* Visual element - plant silhouettes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 text-white/80">
                  <Leaf className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 mt-auto">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-primary/10">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-medium text-gray-900 dark:text-white">Flora Scan</span>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <Link className="text-sm text-gray-600 hover:text-primary dark:text-gray-300" href="/">
                Home
              </Link>
              <Link className="text-sm text-gray-600 hover:text-primary dark:text-gray-300" href="/flora-gallery">
                Flora Gallery
              </Link>
              <Link
                className="text-sm text-gray-600 hover:text-primary dark:text-gray-300"
                href="/interactive-tools/find-plant"
              >
                Build Your Facade
              </Link>
              <Link
                className="text-sm text-gray-600 hover:text-primary dark:text-gray-300"
                href="/interactive-tools/facade-preview"
              >
                Facade Preview
              </Link>
            </nav>

            <div className="text-sm text-gray-500 dark:text-gray-400">© 2025 Flora Scan. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
