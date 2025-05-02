"use client";
import React, { useEffect, useRef } from "react";
import { Heading } from "../elements/heading";
import { Subheading } from "../elements/subheading";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { AnimatedArrow } from "../decorations/animated-arrow";

const sectionVariants = (direction: "forward" | "backward") => ({
  hidden: {
    opacity: 0,
    y: direction === "forward" ? "100%" : "-100%",
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: direction === "forward" ? "-100%" : "100%",
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
});

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    transition: {
      opacity: { duration: 0.2 },
      y: { type: "spring", stiffness: 100, damping: 20 },
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.6 },
      y: { type: "spring", stiffness: 100, damping: 20 },
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      opacity: { duration: 0.5 },
      y: { type: "spring", stiffness: 100, damping: 20 },
    },
  },
};

interface DynamicBgSectionProps {
  section_title: string;
  section_large_text: string;
  section_small_text: string;
  bg_media_link: any;
  onNextSection: () => void;
  isActive: boolean;
  isLastSection?: boolean;
  direction: "forward" | "backward";
  locale?: string;
}

export const DynamicBgSection = ({
  section_title,
  section_large_text,
  section_small_text,
  bg_media_link,
  onNextSection,
  isActive,
  isLastSection,
  direction,
}: DynamicBgSectionProps) => {
  const isVideo = bg_media_link?.mime?.startsWith("video/");
  const isImage = bg_media_link?.mime?.startsWith("image/");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Control video playback based on isActive
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch((error) => console.error("Video play failed:", error));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  // Conditionally handle onNextSection for AnimatedArrow
  const handleArrowComplete = () => {
    if (!isLastSection) {
      onNextSection();
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          variants={sectionVariants(direction)}
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={direction}
          className="h-screen overflow-hidden absolute inset-0 flex flex-col items-start justify-end md:px-8 lg:px-16 xl:px-24"
        >
          {/* Background Media */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute inset-0 z-0"
          >
            {isVideo && (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={strapiImage(bg_media_link.url)} type={bg_media_link.mime} />
              </video>
            )}

            {isImage && (
              <Image
                src={strapiImage(bg_media_link.url)}
                alt={section_title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            )}
            {/* Black-alpha overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 z-10"
              aria-hidden="true"
            />
          </motion.div>

          {/* Content Container */}
          <div className="relative z-20 w-full md:max-w-[70%] flex flex-col items-start justify-end p-6 md:p-8 lg:p-12 mb-8">
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              <Subheading className="text-left text-md md:text-base text-white">
                {section_title}
              </Subheading>

              <Heading
                as="h1"
                className="text-3xl md:text-5xl lg:text-6xl xl:text-8xl font-semibold text-left text-white"
              >
                {section_large_text}
              </Heading>

              <Subheading className="text-left text-lg md:text-xl text-white mb-2">
                {section_small_text}
              </Subheading>

              <div className="hidden md:flex mt-12">
                <AnimatedArrow
                  onComplete={handleArrowComplete}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DynamicBgSections = ({ bgSections, locale }: { bgSections: any[], locale: string }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<"forward" | "backward">("forward"); // Track direction
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Handle next section
  const handleNextSection = () => {
    setDirection("forward");
    setCurrentSectionIndex((prev) => (prev + 1) % bgSections.length);
  };

  const handlePrevSection = () => {
    setDirection("backward");
    setCurrentSectionIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  const handleScroll = (e: WheelEvent) => {
    // Prevent section change on last section when scrolling down
    if (currentSectionIndex === bgSections.length - 1 && e.deltaY > 0) {
      return;
    }

    if (e.deltaY > 0) {
      // Scroll Down: Move to the next section
      if (currentSectionIndex < bgSections.length - 1) {
        handleNextSection();
      }
    } else {
      // Scroll Up: Move to the previous section
      if (currentSectionIndex > 0) {
        handlePrevSection();
      }
    }
  };

  // Add wheel event listener only when container is in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("wheel", handleScroll, { passive: true });
        } else {
          window.removeEventListener("wheel", handleScroll);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the container is visible
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentSectionIndex]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {bgSections.map((section, index) => (
        <DynamicBgSection
          key={section.id || section.section_title}
          {...section}
          locale={locale}
          onNextSection={handleNextSection}
          isActive={index === currentSectionIndex}
          isLastSection={index === bgSections.length - 1}
          direction={direction} // Pass direction to section
        />
      ))}
    </div>
  );
};