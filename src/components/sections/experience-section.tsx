"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconCheck, IconCalendar, IconMapPin } from "@tabler/icons-react";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const experienceSectionRef = useRef<HTMLDivElement>(null);
  const educationSectionRef = useRef<HTMLDivElement>(null);

  const isHeadingInView = useInView(headingRef, { once: true });
  const isExperienceSectionInView = useInView(experienceSectionRef, {
    once: true,
    amount: 0.1,
  });
  const isEducationSectionInView = useInView(educationSectionRef, {
    once: true,
    amount: 0.1,
  });

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.6, 1, 1, 0.6]
  );

  return (
    <motion.section
      id="experience"
      ref={sectionRef}
      className="relative py-section overflow-hidden"
      style={{ opacity }}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background/80" />

      <motion.div
        className="absolute inset-0 -z-10 opacity-10"
        style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark" />
      </motion.div>

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.7, delay: 0.2 }}>
            <motion.div
              className="inline-block relative mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.1 }}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <IconCalendar className="h-5 w-5" />
              </div>
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping-slow opacity-75" />
            </motion.div>

            <motion.h2
              ref={headingRef}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5 }}>
              Experience
            </motion.h2>

            <motion.p
              className="text-muted-foreground max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}>
              My professional journey and work experience.
            </motion.p>
          </motion.div>
        </div>

        <div
          ref={experienceSectionRef}
          className="max-w-4xl mx-auto space-y-6 md:space-y-8 px-2">
          {portfolioData.experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={
                isExperienceSectionInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}>
              <Card className="relative overflow-hidden backdrop-blur-sm transition-all duration-300 perspective-container">
                <motion.div
                  className="card-3d relative"
                  animate={{
                    rotateX: hoveredItem === index ? 2 : 0,
                    rotateY: hoveredItem === index ? 2 : 0,
                    scale: hoveredItem === index ? 1.01 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                  <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                          animate={{
                            scale: hoveredItem === index ? 1.1 : 1,
                            backgroundColor:
                              hoveredItem === index
                                ? "var(--primary)"
                                : "rgba(var(--primary), 0.1)",
                          }}
                          transition={{ duration: 0.3 }}>
                          <IconCheck className="h-5 w-5 text-primary" />
                        </motion.div>
                        <CardTitle className="text-xl">
                          <motion.span
                            animate={{
                              color:
                                hoveredItem === index
                                  ? "var(--primary)"
                                  : "currentColor",
                            }}
                            transition={{ duration: 0.3 }}>
                            {item.position}
                          </motion.span>
                        </CardTitle>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center md:ml-auto">
                        <IconCalendar className="w-4 h-4 mr-1" />
                        {item.duration}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center text-base font-medium mb-1">
                      <span className="text-foreground/90">{item.company}</span>
                      {item.company && item.company.split(",").length > 1 && (
                        <div className="flex items-center ml-3 text-muted-foreground text-sm">
                          <IconMapPin className="w-3.5 h-3.5 mr-1" />
                          {item.company.split(",")[1].trim()}
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {item.technologies && item.technologies.length > 0 && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-muted-foreground">
                          {item.technologies.map((tech, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={
                                isExperienceSectionInView
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: -10 }
                              }
                              transition={{
                                duration: 0.3,
                                delay: 0.3 + i * 0.05 + index * 0.1,
                              }}>
                              <motion.span
                                className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary opacity-80"
                                animate={{
                                  scale:
                                    hoveredItem === index ? [1, 1.5, 1] : 1,
                                  opacity:
                                    hoveredItem === index ? [0.8, 1, 0.8] : 0.8,
                                }}
                                transition={{
                                  duration: 1,
                                  repeat: hoveredItem === index ? Infinity : 0,
                                  repeatDelay: 1,
                                }}
                              />
                              {tech}
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </CardContent>
                </motion.div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-lg opacity-0"
                  animate={{
                    opacity: hoveredItem === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                />

                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-lg opacity-0 -z-10 blur-md"
                  animate={{
                    opacity: hoveredItem === index ? 1 : 0,
                    x: hoveredItem === index ? ["0%", "100%"] : "0%",
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredItem === index ? Infinity : 0,
                    repeatType: "mirror",
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        <div
          ref={educationSectionRef}
          className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-border/30 max-w-4xl mx-auto px-2">
          <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
            <motion.h3
              className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}>
              Education
            </motion.h3>
          </div>

          <div className="space-y-6 md:space-y-8">
            {portfolioData.education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isEducationSectionInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredItem(index + 100)} // Offset to distinguish from experience items
                onMouseLeave={() => setHoveredItem(null)}>
                <Card className="relative overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="card-3d relative"
                    animate={{
                      rotateX: hoveredItem === index + 100 ? 2 : 0,
                      rotateY: hoveredItem === index + 100 ? 2 : 0,
                      scale: hoveredItem === index + 100 ? 1.01 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}>
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                        <CardTitle>{item.degree}</CardTitle>
                        <div className="text-sm text-muted-foreground flex items-center md:ml-auto">
                          <IconCalendar className="w-4 h-4 mr-1" />
                          {item.duration}
                        </div>
                      </div>
                      <CardDescription className="text-base font-medium">
                        {item.institution}
                        {item.institution &&
                          item.institution.split(",").length > 1 && (
                            <span className="text-muted-foreground ml-2 text-sm">
                              • {item.institution.split(",")[1].trim()}
                            </span>
                          )}
                      </CardDescription>
                    </CardHeader>
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-lg opacity-0"
                    animate={{
                      opacity: hoveredItem === index + 100 ? 0.5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
