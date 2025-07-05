"use client";
import { ReactNode } from "react";
import { useLoading } from "../hooks/loading-context";
import {
  SkeletonCard,
  SkeletonGrid,
  SkeletonList,
  SkeletonText,
} from "./skeleton";

type SkeletonWrapperProps = {
  loadingId: string;
  children: ReactNode;
  skeleton?: ReactNode;
  skeletonType?: "text" | "card" | "list" | "grid" | "custom";
  skeletonProps?: {
    lines?: number;
    items?: number;
    columns?: number;
    fields?: number;
  };
  className?: string;
};

export default function SkeletonWrapper({
  loadingId,
  children,
  skeleton,
  skeletonType = "text",
  skeletonProps = {},
  className = "",
}: SkeletonWrapperProps) {
  const { isLoading } = useLoading();
  const isContentLoading = isLoading(loadingId);

  // Render custom skeleton if provided
  if (skeleton && isContentLoading) {
    return <div className={className}>{skeleton}</div>;
  }

  // Render default skeleton based on type
  if (isContentLoading) {
    switch (skeletonType) {
      case "text":
        return (
          <div className={className}>
            <SkeletonText lines={skeletonProps.lines || 3} />
          </div>
        );
      case "card":
        return (
          <div className={className}>
            <SkeletonCard />
          </div>
        );
      case "list":
        return (
          <div className={className}>
            <SkeletonList items={skeletonProps.items || 5} />
          </div>
        );
      case "grid":
        return (
          <div className={className}>
            <SkeletonGrid
              items={skeletonProps.items || 6}
              columns={skeletonProps.columns || 3}
            />
          </div>
        );
      default:
        return (
          <div className={className}>
            <SkeletonText lines={3} />
          </div>
        );
    }
  }

  // Render actual content when not loading
  return <div className={className}>{children}</div>;
}

// Convenience components for common use cases
export const SkeletonTextWrapper = ({
  loadingId,
  children,
  lines = 3,
  className = "",
}: {
  loadingId: string;
  children: ReactNode;
  lines?: number;
  className?: string;
}) => (
  <SkeletonWrapper
    loadingId={loadingId}
    skeletonType="text"
    skeletonProps={{ lines }}
    className={className}
  >
    {children}
  </SkeletonWrapper>
);

export const SkeletonCardWrapper = ({
  loadingId,
  children,
  className = "",
}: {
  loadingId: string;
  children: ReactNode;
  className?: string;
}) => (
  <SkeletonWrapper
    loadingId={loadingId}
    skeletonType="card"
    className={className}
  >
    {children}
  </SkeletonWrapper>
);

export const SkeletonListWrapper = ({
  loadingId,
  children,
  items = 5,
  className = "",
}: {
  loadingId: string;
  children: ReactNode;
  items?: number;
  className?: string;
}) => (
  <SkeletonWrapper
    loadingId={loadingId}
    skeletonType="list"
    skeletonProps={{ items }}
    className={className}
  >
    {children}
  </SkeletonWrapper>
);
