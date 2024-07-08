interface ElementProps {
    children?: React.ReactNode;
}

type BaseDivAttributes = React.ComponentPropsWithoutRef<'div'>;
interface DivElementProps extends BaseDivAttributes {}
