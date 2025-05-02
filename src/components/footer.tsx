"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio-data";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
} from "@tabler/icons-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: portfolioData.personal.socialLinks?.github || "https://github.com",
      icon: <IconBrandGithub className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      url:
        portfolioData.personal.socialLinks?.linkedin || "https://linkedin.com",
      icon: <IconBrandLinkedin className="w-5 h-5" />,
    },
    {
      name: "Twitter",
      url: portfolioData.personal.socialLinks?.twitter || "https://twitter.com",
      icon: <IconBrandTwitter className="w-5 h-5" />,
    },
    {
      name: "Email",
      url: `mailto:${portfolioData.personal.email}`,
      icon: <IconMail className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="relative border-t border-border/40 bg-muted/30 backdrop-blur-sm py-16 mt-16">
      <div className="absolute inset-0 -z-10 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-5"></div>
      <div className="container px-4 mx-auto">
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}>
          <motion.div
            className="flex space-x-4 md:space-x-6 mb-6"
            variants={itemVariants}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-background/80 hover:bg-primary/10 text-foreground hover:text-primary transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}>
                {link.icon}
                <span className="absolute inset-0 rounded-full bg-primary/40 opacity-0 group-hover:opacity-25 blur-sm transition-opacity duration-300"></span>
                <span className="sr-only">{link.name}</span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="text-center mb-8 max-w-md mx-auto"
            variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-3">Let&apos;s Connect</h3>
            <p className="text-muted-foreground text-sm md:text-base">
              I&apos;m currently available for freelance work, collaboration, or
              just a friendly chat about tech, design, or any innovative ideas!
            </p>
          </motion.div>

          <motion.div
            className="w-full max-w-2xl mx-auto"
            variants={itemVariants}>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8">
              <Link
                href="#home"
                className="text-sm text-foreground/80 hover:text-primary transition-colors">
                Home
              </Link>
              <Link
                href="#about"
                className="text-sm text-foreground/80 hover:text-primary transition-colors">
                About
              </Link>
              <Link
                href="#projects"
                className="text-sm text-foreground/80 hover:text-primary transition-colors">
                Projects
              </Link>
              <Link
                href="#skills"
                className="text-sm text-foreground/80 hover:text-primary transition-colors">
                Skills
              </Link>
              <Link
                href="#experience"
                className="text-sm text-foreground/80 hover:text-primary transition-colors">
                Experience
              </Link>
              <Link
                href="#contact"
                className="text-sm text-foreground/80 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </motion.div>

          <motion.div
            className="text-center text-sm text-muted-foreground"
            variants={itemVariants}>
            <p className="mb-1">
              &copy; {currentYear} {portfolioData.personal.name} • All Rights
              Reserved
            </p>
            <p className="text-xs">
              Made with Next.js, Tailwind CSS, and Framer Motion
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
