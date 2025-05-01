import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const { progress, loaded, total } = useProgress();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen when progress is complete or after 3 seconds
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setShowLoading(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="max-w-md w-full px-4">
            <h1 className="text-4xl font-mono text-secondary mb-6 text-center">
              CloudScape
            </h1>
            <p className="text-background text-center mb-8">
              Loading AWS Environment...
            </p>

            {/* AWS-inspired loading bar */}
            <div className="w-full h-2 bg-background/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="flex justify-between text-xs text-background/60 mt-2">
              <span>
                Loading assets: {loaded}/{total}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>

            {/* Animated code snippets */}
            <div className="mt-8 font-mono text-xs text-creative/70 overflow-hidden h-20 rounded bg-primary border border-creative/20 p-2">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-80, 0, -160] }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "linear",
                }}>
                <p># Initializing AWS infrastructure</p>
                <p>$ terraform init</p>
                <p>Initializing modules...</p>
                <p>Initializing provider plugins...</p>
                <p>- Using provider aws v4.5.0</p>
                <p>- Using provider cloudflare v3.1.0</p>
                <p>Terraform has been successfully initialized!</p>
                <p>$ terraform apply</p>
                <p>Plan: 23 to add, 0 to change, 0 to destroy.</p>
                <p>
                  Apply complete! Resources: 23 added, 0 changed, 0 destroyed.
                </p>
                <p># Deploying CloudFront distribution</p>
                <p>$ aws cloudfront create-distribution</p>
                <p>Creating distribution...</p>
                <p>Distribution created successfully!</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
