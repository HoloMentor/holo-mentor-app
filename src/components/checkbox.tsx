import {
    Checkbox as NextUiCheckbox,
    CheckboxProps as NextUiCheckboxProps
} from '@nextui-org/react';

export interface CheckboxProps extends NextUiCheckboxProps {
    isLoading?: boolean;
}

export default function Checkbox({ children, ...props }: CheckboxProps) {
    return <NextUiCheckbox {...props}>{children}</NextUiCheckbox>;
}
