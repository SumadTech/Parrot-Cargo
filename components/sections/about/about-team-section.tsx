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

            <h2 className="mt-3 text-heading-4 text-heading">
              {t("title")}
            </h2>
          </div>
        </MotionWrapper>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <MotionWrapper key={member.key} delay={index * 0.08}>
              <article className="group relative h-95 overflow-hidden rounded-sm border border-stroke bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:h-105 lg:h-110">
                <Image
                  src={member.image}
                  alt={t(`members.${member.key}.imageAlt`)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/45 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                <div className="absolute inset-x-0 bottom-0 p-5 transition-all duration-500 group-hover:translate-y-8 group-hover:opacity-0 sm:p-6">
                  <h3 className="text-body-2 font-semibold text-primary-foreground">
                    {t(`members.${member.key}.name`)}
                  </h3>

                  <p className="mt-1 text-caption-1 text-primary-foreground/85">
                    {t(`members.${member.key}.role`)}
                  </p>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end bg-primary/92 p-6 text-primary-foreground opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 sm:p-7">
                  <div className="translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="text-body-2 font-semibold text-primary-foreground">
                      {t(`members.${member.key}.name`)}
                    </h3>

                    <p className="mt-1 text-caption-2 text-primary-foreground/80">
                      {t(`members.${member.key}.role`)}
                    </p>

                    <p className="mt-6 max-w-sm text-caption-1 text-primary-foreground/85">
                      {t(`members.${member.key}.bio`)}
                    </p>

                    <div className="mt-8 flex items-center gap-3">
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