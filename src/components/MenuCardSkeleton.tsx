import { Skeleton } from "@/components/ui/skeleton";

const MenuCardSkeleton = () => (
  <div className="overflow-hidden rounded-[20px] bg-secondary shadow-card">
    <Skeleton className="aspect-[4/3] w-full rounded-none" />
    <div className="p-4 space-y-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  </div>
);

export default MenuCardSkeleton;
