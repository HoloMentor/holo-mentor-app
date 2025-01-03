import { ErrorMessage, useField, useFormikContext } from 'formik';
import Upload, { UploadProps } from '@/components/upload';

export interface FormUploadProps extends UploadProps {
    name: string;
}

export default function FormUpload({ name, onChange, ...props }: FormUploadProps) {
    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (file: File) => {
        setFieldValue(name, file);
        if (onChange) onChange(file);
    };

    return (
        <div className="flex flex-col gap-1">
            <Upload name={name} onChange={handleChange} value={field.value} {...props} />
            <ErrorMessage className="text-xs text-red-500" name={name} component="p" />
        </div>
    );
}
