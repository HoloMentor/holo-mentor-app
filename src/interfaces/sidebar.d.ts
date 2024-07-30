interface NavItemProps {
    render?: () => React.ReactNode;
    icon?: () => React.ReactNode;
    bottom?: boolean;
    end?: boolean;
    name: string;
}

interface NavLinkProps extends NavItemProps {
    to: LinkProps;
}

interface NavButtonProps extends NavItemProps {
    onClick?: () => void;
}

type NavOptionProps = NavLinkProps | NavButtonProps;

interface RoleSideBarProps {
    general: NavOptionProps[];
    [y: symbol | string]: NavOptionProps[];
}

interface SideBarProps {
    links: NavOptionProps[];
    pathname?: string;
}
