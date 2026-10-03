"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  {
    src: "/images/doctors/hanumanthu2.png",
    alt: "Apollo JBP Doctor",
  },
  {
    src: "/images/doctors/group2.webp",
    alt: "Apollo JBP Doctor",
  },
];

export default function DoctorsImageFlip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const current = images[index];

  return (
    <div className="relative">

      {/* IMAGE FRAME */}
      <div
        className="relative overflow-hidden rounded-[28px] border-[5px] border-white bg-white shadow-[0_25px_70px_rgba(6,32,43,.12)]"
        style={{
          perspective: "1400px",
        }}
      >

        <AnimatePresence mode="sync">
          <motion.div
            key={current.src}
            initial={{
              rotateY: 90,
              transformOrigin: "right center",
              opacity: 0.95,
              zIndex: 2,
            }}
            animate={{
              rotateY: 0,
              transformOrigin: "right center",
              opacity: 1,
            }}
            exit={{
              rotateY: -90,
              transformOrigin: "left center",
              opacity: 0,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <img
              src={current.src}
              alt={current.alt}
              loading="lazy"
              decoding="async"
              className="h-[360px] w-full object-cover sm:h-[450px]"
            />

            {/* subtle paper/light reflection */}
            <motion.div
              initial={{ x: "-120%", opacity: 0 }}
              animate={{ x: "120%", opacity: [0, 0.16, 0] }}
              transition={{
                duration: 0.9,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
            />
          </motion.div>
        </AnimatePresence>

        {/* keeps frame height stable */}
        <div className="invisible">
          <img
            src={images[0].src}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-[360px] w-full object-cover sm:h-[450px]"
          />
        </div>

      </div>

      {/* page corner */}
      <div className="pointer-events-none absolute right-3 top-3 z-20 h-8 w-8 border-r-2 border-t-2 border-[#F6D98A]/80" />

      <div className="pointer-events-none absolute bottom-3 left-3 z-20 h-8 w-8 border-b-2 border-l-2 border-[#F6D98A]/80" />

    </div>
  );
}