"use client";
import { useNotification } from "@/modules/shared/hooks/notification-context";
import { motion, AnimatePresence } from "framer-motion";

export default function Notification() {
  const { notifications, removeNotification } = useNotification();
  return (
    <div className="fixed top-5 right-5 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map(({ id, message, type }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`p-3 rounded-lg shadow-md text-white ${
              type === "success"
                ? "bg-green-500"
                : type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {message}
            <button
              className="ml-2 text-sm"
              onClick={() => removeNotification(id)}
            >
              ✖
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
