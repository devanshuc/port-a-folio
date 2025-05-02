"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { IconBrandGithub, IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { portfolioData } from "@/data/portfolio-data";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "#projects" },
  { name: "Experience", path: "#experience" },
  { name: "Skills", path: "#skills" },
  { name: "Contact", path: "#contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-bold text-xl">
              {portfolioData.personal.name}
            </motion.div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-4">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => scrollToSection(item.path)}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}>
                {item.name}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="icon" asChild>
              <a
                href={portfolioData.personal.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer">
                <IconBrandGithub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="default" asChild>
              <a
                href={portfolioData.resume.url}
                target="_blank"
                rel="noopener noreferrer">
                Resume
              </a>
            </Button>
          </div>
        </div>

        <div className="md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                {open ? (
                  <IconX className="h-5 w-5" />
                ) : (
                  <IconMenu2 className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <div className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="justify-start text-lg"
                    onClick={() => scrollToSection(item.path)}>
                    {item.name}
                  </Button>
                ))}
                <div className="mt-8 flex flex-col gap-2">
                  <Button variant="outline" asChild>
                    <a
                      href={portfolioData.personal.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2">
                      <IconBrandGithub className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="default" asChild>
                    <a
                      href={portfolioData.resume.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      Resume
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
