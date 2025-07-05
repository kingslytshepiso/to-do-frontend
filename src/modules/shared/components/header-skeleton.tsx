"use client";
import { SkeletonAvatar, SkeletonText } from "./skeleton";

type HeaderSkeletonProps = {
  // Indicates if we're likely showing authenticated user skeleton
  isAuthenticated?: boolean;
  // Indicates if this is a compact mobile view
  compact?: boolean;
};

export default function HeaderSkeleton({
  isAuthenticated = false,
  compact = false,
}: HeaderSkeletonProps) {
  if (compact) {
    return <HeaderSkeletonCompact isAuthenticated={isAuthenticated} />;
  }

  if (isAuthenticated) {
    // Skeleton for authenticated user (logout button style)
    return (
      <div className="flex items-center space-x-3 px-4 py-2">
        {/* User avatar and name skeleton */}
        <div className="flex items-center space-x-2">
          <SkeletonAvatar size="sm" />
          <div className="hidden md:block">
            <SkeletonText lines={1} className="w-24" />
          </div>
        </div>

        {/* Logout button skeleton */}
        <div className="flex items-center">
          <SkeletonText lines={1} className="w-16 h-8" />
        </div>
      </div>
    );
  }

  // Skeleton for unauthenticated user (login/signup buttons style)
  return (
    <div className="flex items-center space-x-2 px-4 py-2">
      {/* Login button skeleton */}
      <div className="flex items-center space-x-1">
        <SkeletonText lines={1} className="w-4 h-4" /> {/* Icon skeleton */}
        <SkeletonText lines={1} className="w-12 h-8" />
      </div>

      {/* Signup button skeleton */}
      <div className="flex items-center space-x-1">
        <SkeletonText lines={1} className="w-4 h-4" /> {/* Icon skeleton */}
        <SkeletonText lines={1} className="w-16 h-8" />
      </div>
    </div>
  );
}

// Compact version for mobile
export function HeaderSkeletonCompact({
  isAuthenticated = false,
}: {
  isAuthenticated?: boolean;
}) {
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-end space-x-2 px-4 py-2">
        <SkeletonAvatar size="sm" />
        <SkeletonText lines={1} className="w-12 h-8" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end space-x-2 px-4 py-2">
      <SkeletonText lines={1} className="w-8 h-8" />
      <SkeletonText lines={1} className="w-12 h-8" />
    </div>
  );
}
