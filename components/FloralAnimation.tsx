"use client";

import { motion } from "framer-motion";

export default function FloralAnimation() {
  const petals = Array.from({ length: 30 });

  return (
    <div
      className="floral-animation"
      aria-hidden="true"
    >
      {/* Floating petals */}
      <div className="floral-petals">
        {petals.map((_, i) => (
          <motion.span
            key={i}
            className="floating-petal"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: "-10vh",
              rotate: Math.random() * 360,
              opacity: 0,
            }}
            animate={{
              x: [
                `${Math.random() * 100}vw`,
                `${Math.random() * 100}vw`,
                `${Math.random() * 100}vw`,
              ],
              y: "110vh",
              rotate: [
                0,
                180,
                360,
              ],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 10,
              delay: Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Top-left flowers */}
      <div className="floral-corner floral-left">
        <span className="flower flower-1">✿</span>
        <span className="flower flower-2">❀</span>
        <span className="leaf leaf-1">🌿</span>
        <span className="leaf leaf-2">🌿</span>
      </div>

      {/* Top-right flowers */}
      <div className="floral-corner floral-right">
        <span className="flower flower-1">✿</span>
        <span className="flower flower-2">❀</span>
        <span className="leaf leaf-1">🌿</span>
        <span className="leaf leaf-2">🌿</span>
      </div>

      {/* Side flowers */}
      <div className="floral-side floral-side-left">
        <span>❀</span>
      </div>

      <div className="floral-side floral-side-right">
        <span>✿</span>
      </div>
    </div>
  );
}