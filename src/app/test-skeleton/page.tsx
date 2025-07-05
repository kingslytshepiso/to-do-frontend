import Header from "@/modules/shared/components/header";

export default function TestSkeletonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Skeleton Test Page</h1>
        <p className="text-gray-600">
          This page tests the header skeleton functionality. The header should
          show skeletons during loading states without causing hydration errors.
        </p>
      </div>
    </div>
  );
}
