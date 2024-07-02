import { Formik, Form as FormikForm, FormikHelpers, FormikValues } from 'formik';

interface OtherProps {
    [x: string]: any;
}

interface Props {
    children: any;
    initialValues: OtherProps;
    validationSchema: OtherProps;
    onSubmit: (values: any, formikHelpers: FormikHelpers<FormikValues>) => void;
    className?: string;
    enableReinitialize?: boolean;
}

export default function Form({ children, className, ...props }: Props) {
    return (
        <Formik {...props}>
            <FormikForm className={className}>{children}</FormikForm>
        </Formik>
    );
}
