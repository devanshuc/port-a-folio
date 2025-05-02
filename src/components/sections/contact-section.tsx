"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactForm } from "../contact-form";
import { IconMail, IconMapPin, IconSend } from "@tabler/icons-react";
import { portfolioData } from "@/data/portfolio-data";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });
  const isInfoInView = useInView(infoRef, { once: true, amount: 0.3 });

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      className="py-section relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="absolute inset-0 -z-10 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-[0.03]"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background to-background/80"></div>

      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="inline-block relative mb-2"
            initial={{ scale: 0 }}
            animate={isSectionInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", damping: 12, delay: 0.1 }}>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
              <IconSend className="h-5 w-5" />
            </div>
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping-slow opacity-75"></div>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}>
            Get In Touch
          </motion.h2>

          <motion.p
            className="text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.3 }}>
            Have a project in mind or want to discuss potential opportunities?
            I&apos;d love to hear from you! Fill out the form below or reach out
            through the provided contact information.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto px-4">
          <motion.div
            ref={formRef}
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -50 }}
            animate={
              isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="backdrop-blur-sm bg-background/50 border-border/40 perspective-container overflow-hidden">
              <motion.div
                className="card-3d relative"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I&apos;ll get back to you as
                    soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>

          <motion.div
            ref={infoRef}
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={
              isInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
            }
            transition={{ duration: 0.5, delay: 0.4 }}>
            <Card className="backdrop-blur-sm bg-background/50 border-border/40 h-full perspective-container overflow-hidden">
              <motion.div
                className="card-3d relative h-full flex flex-col"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Alternative ways to reach me
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-6 flex-1">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <IconMail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium mb-1">Email</h3>
                        <a
                          href={`mailto:${portfolioData.personal.email}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {portfolioData.personal.email}
                        </a>
                      </div>
                    </div>

                    {portfolioData.personal.location && (
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                          <IconMapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-base font-medium mb-1">
                            Location
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {portfolioData.personal.location}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="pt-6 mt-auto">
                      <h3 className="text-base font-medium mb-4">
                        Connect with me
                      </h3>
                      <div className="flex space-x-3">
                        {portfolioData.personal.socialLinks?.github && (
                          <a
                            href={portfolioData.personal.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-300">
                            <IconBrandGithub className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                          </a>
                        )}
                        {portfolioData.personal.socialLinks?.linkedin && (
                          <a
                            href={portfolioData.personal.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-300">
                            <IconBrandLinkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                          </a>
                        )}
                        {portfolioData.personal.socialLinks?.twitter && (
                          <a
                            href={portfolioData.personal.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-300">
                            <IconBrandTwitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
