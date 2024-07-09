import { ErrorMessage, useField, useFormikContext } from 'formik';
import Select, { SelectProps, SelectValue } from '../select';

interface FormSelectProps extends SelectProps {
    name: string;
}

export default function FormSelect({ name, onSelectionChange, ...props }: FormSelectProps) {
    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();

    const onChange = (value: SelectValue) => {
        setFieldValue(name, value);
        if (onSelectionChange) onSelectionChange(value);
    };

    return (
        <div className="flex flex-col gap-1">
            <Select onSelectionChange={onChange} {...props} value={field.value} />
            <ErrorMessage className="text-xs text-red-500" name={name} component="p" />
        </div>
    );
}
