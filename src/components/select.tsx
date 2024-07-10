import {
    Select as NextSelect,
    SelectItem,
    SelectProps as NextSelectProps,
    Selection
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

export type SelectValue = string | number | null;

interface OmitChildren extends Omit<NextSelectProps, 'children'> {}
interface OmitOnChange extends Omit<OmitChildren, 'onChange'> {}

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends Omit<OmitOnChange, 'value'> {
    options: SelectOption[];
    onChange?: (key: SelectValue) => void;
    value: SelectValue;
}

export default function Select({ options, value, onChange, ...props }: SelectProps) {
    const [selectedValue, setSelectedValue] = useState(new Set([]));

    useEffect(() => {
        if (new Set([value]) !== selectedValue) {
            const exist = options.find((_: any) => _.value == value);

            if (exist) setSelectedValue(new Set([exist.value]));
        }
    }, [selectedValue, options, value]);

    const handleOnChange = (e: Selection) => {
        const [selected] = e;
        setSelectedValue(new Set([selected]));
        if (onChange) onChange(selected);
    };

    return (
        <NextSelect
            labelPlacement="outside"
            className="bg-white rounded-md"
            selectedKeys={selectedValue}
            classNames={{
                trigger: 'bg-transparent rounded-md'
            }}
            onSelectionChange={handleOnChange}
            {...props}>
            {options.map((item) => (
                <SelectItem key={item.value}>{item.label}</SelectItem>
            ))}
        </NextSelect>
    );
}
