import { ErrorMessage, useField, useFormikContext } from 'formik';
import Input, { InputProps } from '../input';

interface ClassNamesProps {
    mainWrapper?: string;
}

interface FormInputProps extends InputProps {
    name: string;
    classNames?: ClassNamesProps;
}

export default function FormInput({ name, onChange, classNames, ...props }: FormInputProps) {
    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (e: any) => {
        setFieldValue(name, e.target.value);
        if (onChange) onChange(e);
    };

    return (
        <div
            className={`flex flex-col gap-1 ${
                classNames?.mainWrapper ? classNames.mainWrapper : ''
            }`}>
            <Input name={name} onChange={handleChange} {...props} {...field} />
            <ErrorMessage className="text-xs text-red-500" name={name} component="p" />
        </div>
    );
}
