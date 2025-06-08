"use client";

import { motion } from "framer-motion";
import React from "react";

interface MotionWrapperProps {
  children: React.ReactNode;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({ children }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.main>
  );
};
export default MotionWrapper;
