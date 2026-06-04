export type NavItem = {
  labelKey: string;
  href: string;
};

export const navigationItems: NavItem[] = [
  {
    labelKey: "home",
    href: "/",
  },
  {
    labelKey: "about",
    href: "/about",
  },
  {
    labelKey: "services",
    href: "/services",
  },
  {
    labelKey: "blogs",
    href: "/blogs",
  }
];