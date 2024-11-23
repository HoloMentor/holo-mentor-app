import React from 'react';
import { Button as NextButton, ButtonProps as NextButtonProps } from '@nextui-org/react';

export interface ButtonProps extends NextButtonProps {
    rounded?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            rounded = false,
            disabled = false,
            type = 'button',
            color = 'primary',
            className,
            variant = 'solid',
            ...props
        },
        ref
    ) => {
        const _className = React.useMemo(() => {
            let cl = `outline-none cursor-pointer select-none inline-flex items-center gap-2 border-0 py-2 px-7 transition-all duration-200 rounded max-w-max font-semibold text-sm`;

            if (rounded) cl += ' ' + 'rounded-[50px]';
            if (className) cl += ' ' + className;

            return cl;
        }, [variant, className]);

        return (
            <NextButton
                ref={ref}
                disabled={disabled}
                className={_className}
                type={type}
                variant={variant}
                color={color}
                {...props}>
                {children}
            </NextButton>
        );
    }
);

export default Button;
