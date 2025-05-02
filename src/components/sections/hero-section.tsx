"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  Variants,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { AnimatedGradientBackground } from "../animated-background";

const titleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isBioInView = useInView(bioRef, { once: true, amount: 0.5 });

  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const avatarScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const avatarOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const bioY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  useEffect(() => {
    if (isBioInView && bioRef.current) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.8 },
      });

      const text = bioRef.current;
      gsap.fromTo(
        text,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.8,
        }
      );
    }
  }, [isBioInView, controls]);

  const handleContactClick = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeClick = () => {
    window.open(portfolioData.resume.url, "_blank");
  };

  // Split the name into individual characters for animation
  const nameChars = `Hi, I'm ${portfolioData.personal.name}`.split("");

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-section">
      <AnimatedGradientBackground />

      <div className="container relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-8 pb-8 md:pb-0">
          <div className="w-full md:w-3/5 space-y-4 md:space-y-6 text-center md:text-left">
            <motion.h1
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              variants={titleVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              style={{ y: titleY }}>
              {nameChars.map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  variants={letterVariants}
                  className="inline-block"
                  style={{
                    display: "inline-block",
                    whiteSpace: "pre",
                  }}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.5,
                type: "spring",
                stiffness: 50,
              }}
              className="text-xl md:text-2xl text-muted-foreground"
              style={{ y: bioY }}>
              {portfolioData.personal.title}
            </motion.h2>

            <motion.p
              ref={bioRef}
              className="text-base md:text-lg text-muted-foreground max-w-prose opacity-0"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              style={{ y: bioY }}>
              {portfolioData.personal.bio}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2 }}>
              <Button
                onClick={handleContactClick}
                size="lg"
                className="relative overflow-hidden group">
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-primary/20 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-300" />
              </Button>

              <Button
                variant="outline"
                onClick={handleResumeClick}
                size="lg"
                className="relative overflow-hidden group">
                <span className="relative z-10">Resume</span>
                <span className="absolute inset-0 bg-primary/10 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="w-full md:w-2/5 flex justify-center md:justify-end mb-8 md:mb-0"
            style={{
              scale: avatarScale,
              opacity: avatarOpacity,
              y: avatarY,
            }}>
            <HoverCard>
              <HoverCardTrigger>
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3,
                  }}
                  className="relative">
                  <Avatar className="h-28 w-28 md:h-40 md:w-40 border-4 border-background shadow-xl">
                    <AvatarImage
                      src={portfolioData.personal.avatar}
                      alt={portfolioData.personal.name}
                    />
                    <AvatarFallback>
                      {portfolioData.personal.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <motion.div
                    className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center text-sm font-medium border-4 border-background"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.3 }}>
                    Hi!
                  </motion.div>
                </motion.div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage src={portfolioData.personal.avatar} />
                    <AvatarFallback>
                      {portfolioData.personal.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      {portfolioData.personal.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {portfolioData.personal.title}
                    </p>
                    <div className="flex items-center pt-2">
                      <span className="text-xs text-muted-foreground">
                        {portfolioData.personal.location}
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.2 }}
          className="responsive-grid pt-16 mt-8 border-t">
          {portfolioData.skills.slice(0, 4).map((skillCategory, index) => (
            <motion.div
              key={index}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 2.3 + index * 0.1 }}>
              <h3 className="text-sm font-medium text-muted-foreground">
                {skillCategory.category}
              </h3>
              <p className="text-sm">
                {skillCategory.items.slice(0, 3).join(", ")}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{
            delay: 3,
            duration: 1,
            repeat: Infinity,
            repeatType: "mirror",
          }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce">
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
