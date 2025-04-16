// components/ConfirmModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import IconBtn from "./IconBtn";

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel, btnText }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center gap-4 justify-center backdrop-blur-sm !bg-primary/25">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-base text-text p-8 rounded-2xl shadow-sm max-w-lg flex flex-col gap-4"
          >
            <p>{message}</p>
            <div className="flex justify-end gap-2">
              <IconBtn color="primary" onClick={onCancel} text={"Cancel"} />

              <IconBtn
                icon="fi-br-check"
                color="lilac"
                onClick={onConfirm}
                text={btnText}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
