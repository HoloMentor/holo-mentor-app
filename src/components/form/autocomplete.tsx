import { ErrorMessage, useField, useFormikContext } from 'formik';
import AutoComplete, { AutoCompleteProps, AutoCompleteValue } from '../autocomplete';

interface FormAutoCompleteProps extends AutoCompleteProps {
    name: string;
}

export default function FormAutoComplete({
    name,
    onSelectionChange,
    ...props
}: FormAutoCompleteProps) {
    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();

    const onChange = (value: AutoCompleteValue) => {
        setFieldValue(name, value);
        if (onSelectionChange) onSelectionChange(value);
    };

    return (
        <div className="flex flex-col gap-1">
            <AutoComplete onSelectionChange={onChange} {...props} selectedKey={field.value} />
            <ErrorMessage className="text-xs text-red-500" name={name} component="p" />
        </div>
    );
}
