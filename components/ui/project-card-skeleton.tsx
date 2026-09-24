import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectCardSkeleton() {
  return (
    <Card className="bg-gray-800/50 border-gray-700/50 overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="h-48 w-full rounded-none" />
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex justify-between items-center mb-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-2 w-full mb-4" />
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
      </CardContent>
    </Card>
  )
}
