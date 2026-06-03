import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import teamMemberImage from "@/public/images/about/team-member.png";

const teamMembers = [
  {
    key: "ali",
    image: teamMemberImage,
    socials: {
      facebook: "#",
      instagram: "#",
      x: "#",
      linkedin: "#",
    },
  },
  {
    key: "mohamed",
    image: teamMemberImage,
    socials: {
      facebook: "#",
      instagram: "#",
      x: "#",
      linkedin: "#",
    },
  },
  {
    key: "hassan",
    image: teamMemberImage,
    socials: {
      facebook: "#",
      instagram: "#",
      x: "#",
      linkedin: "#",
    },
  },
] as const;

const socialIcons = [
  {
    key: "facebook",
    Icon: FaFacebookF,
  },
  {
    key: "instagram",
    Icon: FaInstagram,
  },
  {
    key: "x",
    Icon: FaXTwitter,
  },
  {
    key: "linkedin",
    Icon: FaLinkedinIn,
  },
] as const;

export function AboutTeamSection() {
  const t = useTranslations("aboutTeam");

  return (
    <Section className="bg-background">
      <Container>
        <MotionWrapper>
          <div className="max-w-3xl">
            <p className="text-caption-1 font-medium text-secondary">
              {t("eyebrow")}
            </p>

            <h2 className="mt-3 text-heading-4 text-heading">{t("title")}</h2>
          </div>
        </MotionWrapper>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <MotionWrapper key={member.key} delay={index * 0.06}>
              <article className="group h-95 rounded-lg [perspective:1200px] sm:h-105 lg:h-110">
                <div className="relative size-full rounded-lg transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
                  {/* Front side */}
                  <div className="absolute inset-0 overflow-hidden rounded-lg border border-stroke bg-card shadow-sm [backface-visibility:hidden]">
                    <Image
                      src={member.image}
                      alt={t(`members.${member.key}.imageAlt`)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/55 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <h3 className="text-body-2 font-semibold text-primary-foreground">
                        {t(`members.${member.key}.name`)}
                      </h3>

                      <p className="mt-1 text-caption-1 text-primary-foreground/85">
                        {t(`members.${member.key}.role`)}
                      </p>
                    </div>
                  </div>

                  {/* Back side */}
                  <div className="absolute inset-0 flex flex-col rounded-lg bg-primary p-6 text-primary-foreground shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-7">
                    <div>
                      <h3 className="text-body-2 font-semibold text-primary-foreground">
                        {t(`members.${member.key}.name`)}
                      </h3>

                      <p className="mt-1 text-caption-2 text-primary-foreground/80">
                        {t(`members.${member.key}.role`)}
                      </p>

                      <p className="mt-10 max-w-sm text-caption-1 text-primary-foreground/85">
                        {t(`members.${member.key}.bio`)}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-3 pt-10">
                      {socialIcons.map(({ key, Icon }, socialIndex) => (
                        <a
                          key={key}
                          href={member.socials[key]}
                          aria-label={t(`socials.${key}`, {
                            name: t(`members.${member.key}.name`),
                          })}
                          className={
                            socialIndex === 0
                              ? "grid size-9 place-items-center rounded-full bg-primary-foreground text-primary transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                              : "grid size-9 place-items-center rounded-full border border-primary-foreground/20 text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                          }
                        >
                          <Icon className="size-4" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </Container>
    </Section>
  );
}