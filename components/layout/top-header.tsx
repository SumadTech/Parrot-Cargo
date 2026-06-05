import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Phone, } from "lucide-react";
import { CiLinkedin } from "react-icons/ci";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { SlSocialInstagram } from "react-icons/sl";

type TopHeaderProps = {
  isScrolled: boolean;
};

export function TopHeader({ isScrolled }: TopHeaderProps) {
  return (
    <div
      className={cn(
        "hidden border-b transition-colors duration-300 lg:block",
        isScrolled
          ? "border-border bg-surface text-body"
          : "border-white/20 bg-transparent text-white/85",
      )}>
      <div className="container-page flex h-14 items-center justify-between">
        <div className="flex min-w-0 items-center gap-2 text-caption-2">
          <Phone className="size-4 shrink-0" />
          <span className="truncate">
            Somalia Desk: {siteConfig.contact.somaliaDesk}
          </span>
          <span
            className={isScrolled ? "text-muted-foreground" : "text-white/50"}>
            |
          </span>
          <span className="truncate">
            China Ops: {siteConfig.contact.chinaOps}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.socials.facebook}
            aria-label="Facebook"
            className={cn(
              "grid size-9 place-items-center rounded-full transition-colors",
              isScrolled
                ? "bg-muted text-heading hover:bg-secondary"
                : "bg-card/15 text-white hover:bg-secondary",
            )}>
            <FaFacebookF className="size-4" />
          </a>

          <a
            href={siteConfig.socials.instagram}
            aria-label="Instagram"
            className={cn(
              "grid size-9 place-items-center rounded-full transition-colors",
              isScrolled
                ? "bg-muted text-heading hover:bg-secondary"
                : "bg-card/15 text-white hover:bg-secondary",
            )}>
            <SlSocialInstagram className="size-4" />
          </a>

          <a
            href={siteConfig.socials.x}
            aria-label="X"
            className={cn(
              "grid size-9 place-items-center rounded-full transition-colors",
              isScrolled
                ? "bg-muted text-heading hover:bg-secondary"
                : "bg-card/15 text-white hover:bg-secondary",
            )}>
            <FaXTwitter className="size-4" />
          </a>

          <a
            href={siteConfig.socials.linkedin}
            aria-label="LinkedIn"
            className={cn(
              "grid size-9 place-items-center rounded-full transition-colors",
              isScrolled
                ? "bg-muted text-heading hover:bg-secondary"
                : "bg-card/15 text-white hover:bg-secondary",
            )}>
            <CiLinkedin className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
