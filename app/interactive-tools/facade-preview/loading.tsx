import { Leaf } from "lucide-react"

export default function FacadePreviewLoading() {
  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <div className="h-8 w-64 bg-slate-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-96 bg-slate-200 rounded animate-pulse"></div>
        </div>

        <div className="h-[500px] bg-slate-200 rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Leaf className="h-8 w-8 animate-spin text-green-500" />
            <p className="text-slate-500">Loading facade visualization...</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
