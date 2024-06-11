import { Formik, Form as FormikForm } from 'formik';

interface OtherProps {
    [x: string]: any;
}

interface Props {
    children: any[];
    initialValues: OtherProps;
    validationSchema: OtherProps;
    onSubmit: (values: any) => void;
    className?: string;
}

export default function Form({
    children,
    initialValues,
    validationSchema,
    onSubmit,
    className
}: Props) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            <FormikForm className={className}>{children}</FormikForm>
        </Formik>
    );
}
