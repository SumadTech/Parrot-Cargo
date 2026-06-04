import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  safeX?: boolean;
};

export function Section({
  children,
  className,
  id,
  safeX = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(safeX ? "safe-x" : "", "section-padding", className)}
    >
      {children}
    </section>
  );
}