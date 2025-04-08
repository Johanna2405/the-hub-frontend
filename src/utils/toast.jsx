// utils/toast.js
import { toast } from "react-toastify";

// Custom Toast Function with Styling
export const showToast = (message, type = "default") => {
  const baseOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored", // Ensure theme is colored for good visibility
  };

  // Custom styles for different types
  let toastBody = message;
  let toastClass = "";

  switch (type) {
    case "success":
      toastClass = "react-toastify__toast--success";
      break;
    case "error":
      toastClass = "react-toastify__toast--error";
      break;
    case "info":
      toastClass = "react-toastify__toast--info";
      break;
    case "warning":
      toastClass = "react-toastify__toast--warning";
      break;
    default:
      toastClass = "react-toastify__toast--default";
      break;
  }

  // Show the toast with the custom body and styles
  toast(toastBody, {
    ...baseOptions,
    className: `react-toastify__toast ${toastClass}`, // Add the right class dynamically
  });
};
