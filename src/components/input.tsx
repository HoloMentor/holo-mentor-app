import React from 'react';

type BaseInputAttributes = React.ComponentPropsWithoutRef<'input'>;

export interface InputProps extends BaseInputAttributes {
    label?: string;
    labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, className, labelClassName, ...props }, ref) => {
        const _className = React.useMemo(() => {
            let cl = `block w-full rounded-md border border-[#0000001A] focus:outline-none focus:!border-dark-green focus:!ring-dark-green text-md file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500`;

            if (className) cl += ' ' + className;

            return cl;
        }, [className]);

        return (
            <label className="flex flex-col gap-2">
                {label && (
                    <span
                        className={`text-dark-gray font-normal ${
                            labelClassName ? labelClassName : ''
                        }`}>
                        {label}
                    </span>
                )}
                <input ref={ref} className={_className} {...props} />
            </label>
        );
    }
);

export default Input;
