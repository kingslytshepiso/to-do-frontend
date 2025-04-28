import { AnimatePresence, motion } from "motion/react";
import Button from "./button";

type DialogProps = {
  isOpen: boolean;
  onClose: (confirm: boolean) => void;
  title?: string | React.ReactNode;
  children?: React.ReactNode;
};
export default function ConfirmDialog({
  title,
  children,
  isOpen,
  onClose,
}: DialogProps) {
  const handleConfirm = () => onClose(true);
  const handleCancel = () => onClose(false);
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          onClick={handleCancel} // Close modal when clicking outside
        >
          <motion.div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-2xl shadow-lg bg-[var(--component-background)] w-96"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-100"
              >
                ✖
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4">{children}</div>

            {/* Modal Footer/actions */}
            <div className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={handleCancel}>
                Close
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
