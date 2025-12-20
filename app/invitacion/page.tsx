"use client";

import { motion } from "framer-motion";

export default function Knot() {
  return (
    <div className="flex items-center justify-center p-8">
      <svg width="280" height="280" viewBox="0 0 280 280">
        {/* Nudo inicial - línea horizontal superior */}
        <motion.path
          d="M30 140 Q140 80, 250 140"
          fill="none"
          stroke="#A0826D"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 1, opacity: 1 }}
          animate={{ 
            pathLength: 0,
            opacity: 0
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut"
          }}
        />

        {/* Nudo inicial - línea horizontal inferior */}
        <motion.path
          d="M30 140 Q140 200, 250 140"
          fill="none"
          stroke="#8B6F47"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 1, opacity: 1 }}
          animate={{ 
            pathLength: 0,
            opacity: 0
          }}
          transition={{
            duration: 2.5,
            delay: 0.1,
            ease: "easeInOut"
          }}
        />

        {/* Cuerda izquierda desamarrandose */}
        <motion.path
          d="M50 140 Q80 120, 140 140"
          fill="none"
          stroke="#C4A882"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: 1
          }}
          transition={{
            delay: 0.8,
            duration: 2,
            ease: "easeOut"
          }}
        />

        {/* Cuerda derecha desamarrandose */}
        <motion.path
          d="M230 140 Q200 160, 140 140"
          fill="none"
          stroke="#C4A882"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: 1
          }}
          transition={{
            delay: 0.8,
            duration: 2,
            ease: "easeOut"
          }}
        />

        {/* Cuerda cayendo a la izquierda */}
        <motion.path
          d="M50 140 Q30 180, 20 240"
          fill="none"
          stroke="#C4A882"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: 1
          }}
          transition={{
            delay: 1.8,
            duration: 1.5,
            ease: "easeIn"
          }}
        />

        {/* Cuerda cayendo a la derecha */}
        <motion.path
          d="M230 140 Q250 180, 260 240"
          fill="none"
          stroke="#C4A882"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: 1
          }}
          transition={{
            delay: 1.8,
            duration: 1.5,
            ease: "easeIn"
          }}
        />

        {/* Destello del nudo desamarrandose */}
        <motion.circle
          cx="140"
          cy="140"
          r="8"
          fill="#E8D4C4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{
            delay: 0.8,
            duration: 0.8,
            ease: "easeOut"
          }}
        />
      </svg>
    </div>
  );
}
