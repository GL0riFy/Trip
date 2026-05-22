"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5, 
      y: 40 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.5, 
      y: 30,
      transition: { 
        duration: 0.2 
      }
    }
  };

  const arrowVariants: Variants = {
    hover: {
      y: -4,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover={{ 
            scale: 1.15,
            boxShadow: "0 0 25px rgba(249, 115, 22, 0.6)",
            background: "linear-gradient(135deg, #ff8008 0%, #ffc837 100%)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer focus:outline-none border-2 border-white/20 backdrop-blur-sm group"
          aria-label="Scroll to top"
        >
          <motion.div
            variants={arrowVariants}
            whileHover="hover"
            className="flex items-center justify-center"
          >
            <ChevronUp className="w-7 h-7 stroke-[2.5]" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
