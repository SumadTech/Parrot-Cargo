"use client";

import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    key: "experience",
    value: 6,
    suffix: "+",
  },
  {
    key: "shipments",
    value: 500,
    suffix: "+",
  },
  {
    key: "regions",
    value: 3,
    suffix: "+",
  },
  {
    key: "support",
    value: 24,
    suffix: "/7",
  },
] as const;

type CountUpNumberProps = {
  value: number;
  suffix: string;
  start: boolean;
};

function CountUpNumber({ value, suffix, start }: CountUpNumberProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: 1400,
    bounce: 0,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return () => unsubscribe();
  }, [springValue]);

  useEffect(() => {
    if (start) {
      motionValue.set(value);
    }
  }, [motionValue, start, value]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const t = useTranslations("homeStats");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <Section className="bg-background">
      <Container>
        <MotionWrapper>
          <div
            ref={sectionRef}
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="min-w-0"
              >
                <p className="text-caption-1 text-body">
                  {t(`items.${stat.key}.label`)}
                </p>

                <p className="mt-3 text-heading-3 font-semibold text-primary">
                  <CountUpNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    start={isInView}
                  />
                </p>
              </motion.div>
            ))}
          </div>
        </MotionWrapper>
      </Container>
    </Section>
  );
}