"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { useToast } from "@repo/ui/hooks/use-toast";
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from "next-intl";

interface CopyButtonProps {
  text: string;
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const t = useTranslations();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        description: t("app.copy.success"),
        duration: 2000,
        className: "bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-600 font-medium border border-emerald-200 shadow-lg rounded-xl",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
      toast({
        description: t("app.copy.error"),
        variant: "destructive",
        className: "bg-gradient-to-r from-red-50 to-rose-50 text-rose-600 font-medium border border-rose-200 shadow-lg rounded-xl",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleCopy();
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      onKeyDown={handleKeyDown}
      className="transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 rounded-xl group"
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
      role="button"
      tabIndex={0}
      title={copied ? "Copied!" : "Copy number"}
      data-testid="copy-button"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
            exit={{ 
              opacity: 0,
              scale: 0.8, 
              y: -10,
              transition: {
                duration: 0.2,
                ease: "easeInOut"
              }
            }}
            className="text-emerald-600"
          >
            <Check className="size-5 transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-12" aria-hidden="true" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{
              opacity: 1,
              scale: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: -10,
              transition: {
                duration: 0.2,
                ease: "easeInOut" 
              }
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text"
          >
            <Copy className="size-6 transition-all duration-300 ease-out group-hover:scale-110 group-hover:-rotate-12" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

CopyButton.displayName = "CopyButton";

export default CopyButton;
