import { ErrorMessage, useField, useFormikContext } from 'formik';
import React from 'react';
import { Dropdown as NextDropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";

interface ClassNamesProps {
    mainWrapper?: string;
}

interface FormDropdownProps {
    label?: string;
    name: string;
    options: { value: string; label: string }[];
    classNames?: ClassNamesProps;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FormDropdown({ name, label, options, classNames, onChange, ...props }: FormDropdownProps) {
    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFieldValue(name, e.target.value);
        if (onChange) onChange(e);
    };

    return (
        <div className={`flex flex-col gap-1 ${classNames?.mainWrapper ? classNames.mainWrapper : ''}`}>
            {label && (
                <label htmlFor={name} className="text-sm">
                    {label}
                </label>
            )}
            <NextDropdown>
                <DropdownTrigger>
                    <select
                        {...field}
                        {...props}
                        id={name}
                        onChange={handleChange}
                        className={`block text-sm shadow-none border-2 border-[#0000001A] rounded-md data-[focus=true]:!border-dark-green`}
                    >
                        <option value="">Select {label}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownSection>
                        {options.map((option) => (
                            <DropdownItem
                                key={option.value}
                                value={option.value}
                                onClick={() => setFieldValue(name, option.value)}
                            >
                                {option.label}
                            </DropdownItem>
                        ))}
                    </DropdownSection>
                </DropdownMenu>
            </NextDropdown>
            <ErrorMessage className="text-xs text-red-500" name={name} component="p" />
        </div>
    );
}
