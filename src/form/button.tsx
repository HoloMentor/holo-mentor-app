import { useFormikContext } from 'formik';
import Button, { ButtonProps } from '../components/button';

export default function SubmitButton({ children, onClick, ...props }: ButtonProps) {
    const { submitForm } = useFormikContext();

    const onSubmit = (e: any) => {
        e.preventDefault();

        submitForm();
        if (onClick) onClick(e);
    };

    return (
        <Button onClick={onSubmit} {...props}>
            {children}
        </Button>
    );
}
