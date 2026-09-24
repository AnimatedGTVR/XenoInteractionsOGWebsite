import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TeamCardSkeleton() {
  return (
    <Card className="bg-gray-800/50 border-gray-700/50 text-center">
      <CardHeader>
        <div className="relative mb-4">
          <Skeleton className="w-24 h-24 mx-auto rounded-full" />
          <Skeleton className="absolute -top-2 -right-2 w-8 h-8 rounded-full mx-auto" />
        </div>
        <Skeleton className="h-6 w-24 mx-auto mb-2" />
        <Skeleton className="h-5 w-32 mx-auto" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </CardContent>
    </Card>
  )
}
