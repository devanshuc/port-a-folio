"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import {
  IconBrandGithub,
  IconExternalLink,
  IconChevronRight,
} from "@tabler/icons-react";
import { portfolioData } from "@/data/portfolio-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projectCardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      delay: i * 0.1 + 0.2,
    },
  }),
};

const tagVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.2 },
  }),
  hover: {
    scale: 1.05,
    backgroundColor: "var(--primary-light)",
    color: "var(--primary)",
    transition: { duration: 0.2 },
  },
};

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isHeadingInView = useInView(headingRef, { once: true });

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.6, 1, 1, 0.6]
  );
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.section
      id="projects"
      className="relative py-section overflow-hidden"
      style={{ opacity: sectionOpacity }}
      ref={sectionRef}>
      <div
        className="absolute inset-0 -z-10 bg-muted/50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 75%, var(--primary-light-transparent) 0%, transparent 25%), radial-gradient(circle at 80% 30%, var(--primary-light-transparent) 0%, transparent 20%)",
        }}
      />

      <motion.div
        className="absolute inset-0 -z-10 bg-grid-pattern opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          backgroundSize: "30px 30px",
          backgroundImage:
            "linear-gradient(to right, var(--muted-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--muted-foreground) 1px, transparent 1px)",
        }}
      />

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
              Projects
            </motion.h2>

            <motion.p
              className="text-muted-foreground max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}>
              Here are some of the projects I&apos;ve worked on that showcase my
              skills and experience.
            </motion.p>
          </motion.div>
        </div>

        <motion.div className="responsive-grid" style={{ y }}>
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={projectCardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}>
              <Card className="h-full flex flex-col overflow-hidden border-border/60 bg-card/80 backdrop-blur-sm">
                {project.image && (
                  <div className="aspect-video relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 z-10 bg-gradient-to-t from-card/80 to-transparent opacity-50"
                      animate={{
                        opacity: hoveredProject === index ? 0.7 : 0.5,
                      }}
                    />
                    <motion.div
                      animate={{
                        scale: hoveredProject === index ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      className="h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="line-clamp-1">{project.title}</span>
                    <motion.div
                      className="ml-auto opacity-0 flex-shrink-0"
                      animate={{
                        opacity: hoveredProject === index ? 1 : 0,
                        x: hoveredProject === index ? 0 : 10,
                      }}
                      transition={{ duration: 0.2 }}>
                      <IconChevronRight className="h-4 w-4 text-primary" />
                    </motion.div>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 5).map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        custom={tagIndex}
                        variants={tagVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-border/30">
                        {tag}
                      </motion.span>
                    ))}
                    {project.tags.length > 5 && (
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-border/30">
                        +{project.tags.length - 5} more
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 relative overflow-hidden group"
                      asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer">
                        <span className="relative z-10 flex items-center gap-1">
                          <IconBrandGithub className="h-4 w-4" />
                          Code
                        </span>
                        <span className="absolute inset-0 bg-primary/10 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-300" />
                      </a>
                    </Button>
                  )}
                  {project.link && (
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-1 relative overflow-hidden group"
                      asChild>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        <span className="relative z-10 flex items-center gap-1">
                          <IconExternalLink className="h-4 w-4" />
                          Live
                        </span>
                        <span className="absolute inset-0 bg-primary/20 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-300" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}>
          <Button
            variant="outline"
            size="lg"
            className="group relative overflow-hidden"
            asChild>
            <a
              href={portfolioData.personal.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2">
              <span className="relative z-10">View More on GitHub</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 2,
                  duration: 0.8,
                }}>
                <IconChevronRight className="h-4 w-4" />
              </motion.span>
              <span className="absolute inset-0 bg-primary/10 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
