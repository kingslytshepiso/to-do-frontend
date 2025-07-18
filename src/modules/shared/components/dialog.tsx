import { AnimatePresence, motion } from "motion/react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
};
export default function Dialog({
  title,
  subTitle,
  content,
  actions,
  isOpen,
  onClose,
}: DialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={onClose} // Close modal when clicking outside
        >
          <motion.div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-96"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
            </div>
            {/* Modal sub-title */}

            <h4 className="text-sm font-semibold">{subTitle}</h4>

            {/* Modal Body */}
            <div className="py-4">{content}</div>

            {/* Modal Footer/actions */}
            <div className="flex justify-end space-x-2">
              {actions}
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
