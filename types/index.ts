export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  whatsapp: string;
  instagram: string;
  email: string;
  phone: string;
  address: string;
  navLinks: NavLink[];
  footerLinks: {
    title: string;
    links: NavLink[];
  }[];
}
