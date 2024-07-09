import { Autocomplete, AutocompleteItem, AutocompleteProps } from '@nextui-org/react';

export type SelectValue = string | number | null;

interface OmitChildren extends Omit<AutocompleteProps, 'children'> {}

export interface SelectProps extends Omit<OmitChildren, 'onSelectionChange'> {
    onSelectionChange?: (key: SelectValue) => void;
}

export default function Select({ onSelectionChange, ...props }: SelectProps) {
    const onChange = (e: string) => {
        if (onSelectionChange) onSelectionChange(e);
    };
    return (
        <Autocomplete
            labelPlacement="outside"
            clearIcon={false}
            className="bg-white"
            onSelectionChange={onChange}
            inputProps={{
                classNames: {
                    inputWrapper:
                        'shadow-none border-2 border-[#0000001A] focus:outline-none focus:!border-dark-green focus:!ring-dark-green rounded-md bg-transparent',
                    input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                }
            }}
            {...props}>
            {(item: any) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
    );
}
