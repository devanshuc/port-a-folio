"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

// Define the form values type
type FormValues = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Form submission handler
  const onSubmit = async () => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset the form and show success dialog
    setIsSuccessDialogOpen(true);
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your email"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message"
                    rows={5}
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>
        </form>
      </Form>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Sent!</DialogTitle>
            <DialogDescription>
              Thank you for reaching out. I&apos;ll get back to you as soon as
              possible.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsSuccessDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
