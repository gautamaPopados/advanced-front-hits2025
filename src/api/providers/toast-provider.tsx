import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider = () => <ToastContainer position="bottom-right" autoClose={3000} />;

export const showToast = (message: string, type: "success" | "error" | "warning" | "info") => {
  toast[type](message);
};