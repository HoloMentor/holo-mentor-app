interface NavOptionProps {
    icon: () => React.ReactNode;
    name: string;
    to: LinkProps;
    end?: boolean;
}

interface RoleSideBarProps {
    general: NavOptionProps[];
    [y: symbol | string]: NavOptionProps[];
}

interface SideBarProps {
    links: NavOptionProps[];
    pathname?: string;
}
