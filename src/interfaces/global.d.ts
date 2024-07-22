interface ElementProps {
    children?: ReactElement;
}

type BaseDivAttributes = React.ComponentPropsWithoutRef<'div'>;
interface DivElementProps extends BaseDivAttributes {}
