import React, { createContext, useState, useContext } from "react";

// Create the context
const ToastContext = createContext();

// Custom hook to use toast context
export const useToast = () => useContext(ToastContext);

// ToastProvider component to wrap your app and provide context
export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // default type

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);

    setTimeout(() => {
      setToastMessage(""); // Reset the message after timeout to hide it
    }, 3000); // Duration for how long toast stays visible
  };

  return (
    <ToastContext.Provider value={{ showToast, toastMessage, toastType }}>
      {children}
    </ToastContext.Provider>
  );
};
