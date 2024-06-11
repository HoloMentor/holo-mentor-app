import React from 'react';

type BaseInputAttributes = React.ComponentPropsWithoutRef<'input'>;

export interface InputProps extends BaseInputAttributes {
    label?: string;
}

export default function Input({ label, className, ...props }: InputProps) {
    const _className = React.useMemo(() => {
        let cl = `w-full rounded-md border-[#0000001A] focus:!border-dark-green focus:!ring-dark-green text-md`;

        if (className) cl += ' ' + className;

        return cl;
    }, [className]);

    return (
        <label className="flex flex-col gap-1">
            {label && <span className="text-dark-gray font-medium">{label}</span>}
            <input className={_className} {...props} />
        </label>
    );
}
