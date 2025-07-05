"use client";
import { useEffect, useState } from "react";
import { useLoading } from "../hooks/loading-context";
import { SkeletonForm } from "./skeleton";
import SkeletonWrapper, {
  SkeletonCardWrapper,
  SkeletonListWrapper,
} from "./skeleton-wrapper";

// Mock data types
type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  description: string;
};

export default function SkeletonExample() {
  const { startLoading, stopLoading } = useLoading();
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [profile, setProfile] = useState<User | null>(null);

  // Example 1: Load users with skeleton
  const loadUsers = async () => {
    startLoading("users-list", "Loading users...");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const mockUsers: User[] = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          avatar: "/avatar1.jpg",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          avatar: "/avatar2.jpg",
        },
        {
          id: "3",
          name: "Bob Johnson",
          email: "bob@example.com",
          avatar: "/avatar3.jpg",
        },
      ];
      setUsers(mockUsers);
    } finally {
      stopLoading("users-list");
    }
  };

  // Example 2: Load todos with skeleton
  const loadTodos = async () => {
    startLoading("todos-grid", "Loading todos...");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockTodos: Todo[] = [
        {
          id: "1",
          title: "Learn React",
          completed: true,
          description: "Master React fundamentals",
        },
        {
          id: "2",
          title: "Build App",
          completed: false,
          description: "Create a todo application",
        },
        {
          id: "3",
          title: "Deploy",
          completed: false,
          description: "Deploy to production",
        },
        {
          id: "4",
          title: "Test",
          completed: false,
          description: "Write comprehensive tests",
        },
      ];
      setTodos(mockTodos);
    } finally {
      stopLoading("todos-grid");
    }
  };

  // Example 3: Load profile with skeleton
  const loadProfile = async () => {
    startLoading("user-profile", "Loading profile...");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProfile({
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "/avatar1.jpg",
      });
    } finally {
      stopLoading("user-profile");
    }
  };

  // Load data on mount
  useEffect(() => {
    loadUsers();
    loadTodos();
    loadProfile();
  }, []);

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">Skeleton Loading Examples</h1>

      {/* Example 1: List with Skeleton */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. User List with Skeleton</h2>
        <SkeletonListWrapper loadingId="users-list" items={3}>
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full bg-gray-200"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                  View
                </button>
              </div>
            ))}
          </div>
        </SkeletonListWrapper>
      </section>

      {/* Example 2: Grid with Skeleton */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. Todos Grid with Skeleton</h2>
        <SkeletonWrapper
          loadingId="todos-grid"
          skeletonType="grid"
          skeletonProps={{ items: 4, columns: 2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todos.map((todo) => (
              <div key={todo.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{todo.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      todo.completed
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{todo.description}</p>
              </div>
            ))}
          </div>
        </SkeletonWrapper>
      </section>

      {/* Example 3: Profile Card with Skeleton */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. Profile Card with Skeleton</h2>
        <SkeletonCardWrapper loadingId="user-profile">
          {profile && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-16 h-16 rounded-full bg-gray-200"
                />
                <div>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <p className="text-gray-600">{profile.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Member since: January 2024
                </p>
                <p className="text-sm text-gray-600">Last login: 2 hours ago</p>
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                  Settings
                </button>
              </div>
            </div>
          )}
        </SkeletonCardWrapper>
      </section>

      {/* Example 4: Custom Skeleton */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">4. Custom Skeleton</h2>
        <SkeletonWrapper
          loadingId="custom-content"
          skeleton={
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          }
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold">Custom Content</h3>
            <p className="text-gray-600">
              This content uses a custom skeleton design.
            </p>
          </div>
        </SkeletonWrapper>
      </section>

      {/* Example 5: Form Skeleton */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">5. Form Skeleton</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <SkeletonForm fields={4} />
        </div>
      </section>

      {/* Controls */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Controls</h2>
        <div className="flex space-x-4">
          <button
            onClick={loadUsers}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Users
          </button>
          <button
            onClick={loadTodos}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Reload Todos
          </button>
          <button
            onClick={loadProfile}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Reload Profile
          </button>
        </div>
      </section>
    </div>
  );
}
