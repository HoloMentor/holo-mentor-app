import { ErrorMessage, useFormikContext } from 'formik';
import Input, { InputProps } from '../input';

interface FormInputProps extends InputProps {
    name: string;
}

export default function FormInput({ name, onChange, ...props }: FormInputProps) {
    const { setFieldValue } = useFormikContext();

    const handleChange = (e: any) => {
        setFieldValue(name, e.target.value);
        if (onChange) onChange(e);
    };

    return (
        <div className="flex flex-col gap-1">
            <Input name={name} onChange={handleChange} {...props} />
            <ErrorMessage className="text-xs text-red-500" name={name} component="p" />
        </div>
    );
}
