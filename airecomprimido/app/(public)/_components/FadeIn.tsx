"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "none"
}

export function FadeIn({ children, className, delay = 0, direction = "up" }: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const initial = {
    opacity: 0,
    y: direction === "up" ? 24 : 0,
    x: direction === "left" ? -24 : direction === "right" ? 24 : 0,
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
