"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconChevronRight } from "@tabler/icons-react";

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isHeadingInView = useInView(headingRef, { once: true });

  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [tabHovered, setTabHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.6, 1, 1, 0.6]
  );
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.section
      id="skills"
      ref={sectionRef}
      className="relative py-section overflow-hidden"
      style={{ opacity: sectionOpacity }}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80" />

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
                <IconChevronRight className="h-5 w-5" />
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
              Skills
            </motion.h2>

            <motion.p
              className="text-muted-foreground max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}>
              I have experience with a variety of technologies and tools across
              the development stack.
            </motion.p>
          </motion.div>
        </div>

        <motion.div style={{ y }} className="max-w-4xl mx-auto">
          <Tabs
            defaultValue={portfolioData.skills[0].category}
            className="w-full">
            <div className="flex justify-center mb-8 px-4 overflow-x-auto pb-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative">
                <TabsList
                  className="grid grid-flow-col auto-cols-max gap-2 bg-muted/80 backdrop-blur-sm p-1 rounded-full"
                  onMouseEnter={() => setTabHovered(true)}
                  onMouseLeave={() => setTabHovered(false)}>
                  {portfolioData.skills.map((skill, index) => (
                    <TabsTrigger
                      key={index}
                      value={skill.category}
                      className="relative rounded-full transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">
                      <motion.span
                        className="relative z-10 whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}>
                        {skill.category}
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-primary/10 rounded-full opacity-0"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.5 }}
                        transition={{ duration: 0.3 }}
                      />
                    </TabsTrigger>
                  ))}
                </TabsList>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full blur-md -z-10"
                  animate={{
                    opacity: tabHovered ? 1 : 0.5,
                    scale: tabHovered ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>

            <div className="px-2">
              {portfolioData.skills.map((skill, index) => (
                <TabsContent
                  key={index}
                  value={skill.category}
                  className="mt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                    {skill.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                        className="bg-card/40 rounded-lg p-4 md:p-6 text-center hover:bg-card/80 backdrop-blur-sm transition-all duration-300 border border-border/30 perspective-container relative group"
                        onMouseEnter={() => setHoveredSkill(itemIndex)}
                        onMouseLeave={() => setHoveredSkill(null)}>
                        <motion.div
                          className="card-3d relative z-10"
                          animate={{
                            rotateX: hoveredSkill === itemIndex ? 10 : 0,
                            rotateY: hoveredSkill === itemIndex ? 10 : 0,
                            scale: hoveredSkill === itemIndex ? 1.05 : 1,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                          }}>
                          <motion.span
                            className="text-base md:text-lg font-medium block line-clamp-1"
                            animate={{
                              y: hoveredSkill === itemIndex ? -5 : 0,
                              color:
                                hoveredSkill === itemIndex
                                  ? "var(--primary)"
                                  : "currentColor",
                            }}
                            transition={{ duration: 0.3 }}>
                            {item}
                          </motion.span>

                          <motion.div
                            className="w-12 h-1 bg-primary/40 rounded-full mx-auto mt-3 origin-left"
                            initial={{ width: 12 }}
                            animate={{
                              width: hoveredSkill === itemIndex ? 40 : 12,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>

                        <motion.div
                          className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/10 rounded-lg opacity-0 -z-10"
                          animate={{
                            opacity: hoveredSkill === itemIndex ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </motion.div>
      </div>
    </motion.section>
  );
}
