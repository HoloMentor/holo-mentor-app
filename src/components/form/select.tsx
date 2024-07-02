import { ErrorMessage, useField, useFormikContext } from 'formik';
import Select, { RTSelectValueProps, SelectProps } from '../select';

interface FormSelectProps extends SelectProps {
    name: string;
}

export default function FormSelect({ name, onChange, ...props }: FormSelectProps) {
    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (e: RTSelectValueProps) => {
        setFieldValue(name, e.value);
        if (onChange) onChange(e);
    };

    return (
        <div className="flex flex-col gap-1">
            <Select onChange={handleChange} {...props} value={field.value} />
            <ErrorMessage className="text-xs text-red-500" name={name} component="p" />
        </div>
    );
}
