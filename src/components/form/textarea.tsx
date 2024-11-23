import { ErrorMessage, useField, useFormikContext } from 'formik';
import Textarea, { TextareaProps } from '../Textarea';

interface ClassNamesProps {
    mainWrapper?: string;
}

interface FormTextareaProps extends TextareaProps {
    name: string;
    classNames?: ClassNamesProps;
}

export default function FormTextarea({ name, onChange, classNames, ...props }: FormTextareaProps) {
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
            <Textarea name={name} onChange={handleChange} {...props} {...field} />
            <ErrorMessage className="text-xs text-red-500" name={name} component="p" />
        </div>
    );
}
