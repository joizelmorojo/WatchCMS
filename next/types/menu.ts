export interface MenuLink {
    text: string;
    url: string;
}

export interface Section {
    title: string;
    link: MenuLink[];
}

export interface MenuItem {
    label: string;
    url: string;
    icon: { url: string };
}

export interface SocialLink {
    image: { url: string };
    link: string;
}

export interface MenuType {
    menu_items: MenuItem[];
    sections: Section[];
    social_section: SocialLink[];
}

export interface Gallery {
    title: string;
    items: { 
      id: number;
      image: { url: string };
      name: string;
      price: string;
    }[];
}
