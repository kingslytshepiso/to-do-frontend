"use client";

// Base skeleton component with CSS-only pulse animation
const SkeletonBase = ({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`}>
    {children}
  </div>
);

// Text skeleton with variable width
export const SkeletonText = ({
  lines = 1,
  className = "",
}: {
  lines?: number;
  className?: string;
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonBase
        key={index}
        className={`h-4 ${index === lines - 1 ? "w-3/4" : "w-full"}`}
      />
    ))}
  </div>
);

// Avatar skeleton
export const SkeletonAvatar = ({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <SkeletonBase
      className={`rounded-full ${sizeClasses[size]} ${className}`}
    />
  );
};

// Card skeleton
export const SkeletonCard = ({ className = "" }: { className?: string }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
    <div className="flex items-center space-x-3 mb-4">
      <SkeletonAvatar size="md" />
      <div className="flex-1">
        <SkeletonText lines={2} />
      </div>
    </div>
    <SkeletonText lines={3} className="mb-4" />
    <div className="flex space-x-2">
      <SkeletonBase className="h-8 w-20" />
      <SkeletonBase className="h-8 w-24" />
    </div>
  </div>
);

// Form skeleton
export const SkeletonForm = ({
  fields = 3,
  className = "",
}: {
  fields?: number;
  className?: string;
}) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: fields }).map((_, index) => (
      <div key={index} className="space-y-2">
        <SkeletonBase className="h-4 w-20" />
        <SkeletonBase className="h-10 w-full" />
      </div>
    ))}
    <SkeletonBase className="h-10 w-24 mt-6" />
  </div>
);

// Table skeleton
export const SkeletonTable = ({
  rows = 5,
  columns = 4,
  className = "",
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {/* Header */}
    <div className="bg-gray-50 px-4 py-3 border-b">
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, index) => (
          <SkeletonBase key={index} className="h-4 flex-1" />
        ))}
      </div>
    </div>

    {/* Rows */}
    <div className="divide-y">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="px-4 py-3">
          <div className="flex space-x-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <SkeletonBase key={colIndex} className="h-4 flex-1" />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// List skeleton
export const SkeletonList = ({
  items = 5,
  className = "",
}: {
  items?: number;
  className?: string;
}) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <div
        key={index}
        className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
      >
        <SkeletonAvatar size="sm" />
        <div className="flex-1">
          <SkeletonText lines={1} />
        </div>
        <SkeletonBase className="h-6 w-16" />
      </div>
    ))}
  </div>
);

// Grid skeleton
export const SkeletonGrid = ({
  items = 6,
  columns = 3,
  className = "",
}: {
  items?: number;
  columns?: number;
  className?: string;
}) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4 ${className}`}
  >
    {Array.from({ length: items }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

// Shimmer effect skeleton (alternative to pulse)
export const SkeletonShimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-200 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  </div>
);

// Export all skeleton components
export default {
  Text: SkeletonText,
  Avatar: SkeletonAvatar,
  Card: SkeletonCard,
  Form: SkeletonForm,
  Table: SkeletonTable,
  List: SkeletonList,
  Grid: SkeletonGrid,
  Shimmer: SkeletonShimmer,
};
