"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  duration = 0.6,
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={
        reduce
          ? undefined
          : {
              duration,
              delay,
              ease,
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
  delay = 0.08,
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  x = 0,
  y = 22,
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce
          ? {}
          : {
              opacity: 0,
              x,
              y,
            },

        show: reduce
          ? {}
          : {
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                duration: 0.55,
                ease,
              },
            },
      }}
    >
      {children}
    </motion.div>
  );
}

export function SlowZoomImage({
  children,
  className = "",
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? false
          : {
              scale: 1.045,
            }
      }
      whileInView={
        reduce
          ? undefined
          : {
              scale: 1,
            }
      }
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={
        reduce
          ? undefined
          : {
              duration: 1.2,
              ease,
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function AmbientMotion({
  children,
  className = "",
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={
        reduce
          ? undefined
          : {
              x: [0, 10, 0],
              y: [0, -8, 0],
              scale: [1, 1.035, 1],
            }
      }
      transition={
        reduce
          ? undefined
          : {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function CountUp({
  value,
  className = "",
  duration = 1.1,
}) {
  const reduce = useReducedMotion();

  const numericValue = Number(value);
  const validNumber = Number.isFinite(numericValue);

  const [display, setDisplay] = useState(
    reduce || !validNumber ? value : 0
  );

  useEffect(() => {
    if (reduce || !validNumber) return;

    let frame;

    const start = performance.now();

    const update = (now) => {
      const progress = Math.min(
        (now - start) / (duration * 10000),
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setDisplay(
        Math.round(numericValue * eased)
      );

      if (progress < 1) {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [
    duration,
    numericValue,
    reduce,
    validNumber,
  ]);

  return (
    <span className={className}>
      {display}
    </span>
  );
}