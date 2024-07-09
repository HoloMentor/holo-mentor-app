import React from 'react';
import RTSelect from 'react-tailwindcss-select';

export interface RTSelectValueProps {
    value: string;
    label: string;
    disabled?: boolean;
    isSelected?: boolean;
}

export interface RTSelectGroupOption {
    label: string;
    options: RTSelectValueProps[];
}

export type RTSelectOptions = Array<RTSelectValueProps | RTSelectGroupOption>;

export type RTSelectProps = React.ComponentProps<typeof RTSelect>;

export interface RTWithoutOnChange extends Omit<RTSelectProps, 'onChange'> {}
export interface RTWithoutValue extends Omit<RTWithoutOnChange, 'value'> {}

export interface SelectProps extends Omit<RTWithoutValue, 'primaryColor'> {
    className?: string;
    label?: string;
    value?: string;
    primaryColor?: string;
    labelClassName?: string;
    onChange?: (x: string) => void;
}

export default function Select({
    label,
    className,
    primaryColor = '',
    labelClassName = '',
    value,
    onChange,
    options,
    ...props
}: SelectProps) {
    const [selectedValue, setSelectedValue] = React.useState(null);

    React.useEffect(() => {
        if (value !== selectedValue?.value) {
            const exist = options.find((_: any) => _.value == value);
            if (exist) setSelectedValue(exist);
        }
    }, [selectedValue, options, value]);

    const handleOnChange = (e: RTSelectValueProps) => {
        setSelectedValue(e);
        if (onChange) onChange(e.value);
    };

    return (
        <label className={`flex flex-col gap-2 ${labelClassName ? labelClassName : ''}`}>
            {label && <span className="text-dark-gray font-normal">{label}</span>}

            <RTSelect
                classNames={{
                    menuButton: ({ isDisabled }: any) =>
                        `flex text-md border border-[#0000001A] rounded-md focus:ring-2 ${
                            isDisabled ? 'bg-gray-200' : 'bg-white focus:ring-pink'
                        }`,
                    menu: 'absolute z-[3] w-full bg-white shadow-md border border-[#0000001A] rounded py-1 mt-1.5 text-sm text-black'
                }}
                primaryColor={primaryColor}
                onChange={handleOnChange}
                value={selectedValue}
                options={options}
                {...props}
            />
        </label>
    );
}
