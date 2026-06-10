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
  phoneAlt?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  logo?: string;
  navLinks: NavLink[];
  footerLinks: {
    title: string;
    links: NavLink[];
  }[];
}
