import {
    Autocomplete as NextAutoComplete,
    AutocompleteItem,
    AutocompleteProps
} from '@nextui-org/react';

export type AutoCompleteValue = string | number | null;

interface OmitChildren extends Omit<AutocompleteProps, 'children'> {}

export interface AutoCompleteProps extends Omit<OmitChildren, 'onSelectionChange'> {
    onSelectionChange?: (key: AutoCompleteValue) => void;
}

export default function AutoComplete({
    onSelectionChange,
    placeholder = 'Select',
    ...props
}: AutoCompleteProps) {
    const onChange = (e: string) => {
        if (onSelectionChange) onSelectionChange(e);
    };

    return (
        <NextAutoComplete
            labelPlacement="outside"
            clearIcon={false}
            className="bg-white"
            onSelectionChange={onChange}
            placeholder={placeholder}
            inputProps={{
                classNames: {
                    inputWrapper:
                        'shadow-none border-2 border-[#0000001A] focus:outline-none focus:!border-dark-green focus:!ring-dark-green rounded-md bg-transparent',
                    input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0'
                }
            }}
            {...props}>
            {({ label, ...props }: any) => (
                <AutocompleteItem key={props.key || props.value} {...props}>
                    {label}
                </AutocompleteItem>
            )}
        </NextAutoComplete>
    );
}
