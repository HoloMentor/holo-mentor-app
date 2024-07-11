import React from 'react';
import { Input as NextInput, InputProps as NextInputProps } from '@nextui-org/react';

export interface InputProps extends NextInputProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, labelPlacement = 'outside', variant = 'bordered', ...props }, ref) => {
        const _className = React.useMemo(() => {
            let cl = `block w-full text-md file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500`;

            if (className) cl += ' ' + className;

            return cl;
        }, [className]);

        return (
            <NextInput
                ref={ref}
                className={_className}
                labelPlacement={labelPlacement}
                variant={variant}
                classNames={{
                    inputWrapper: [
                        'shadow-none border-2 border-[#0000001A] rounded-md',
                        'data-[focus=true]:!border-dark-green'
                    ],
                    input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                }}
                {...props}
            />
        );
    }
);

export default Input;
