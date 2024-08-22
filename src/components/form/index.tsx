import { Spinner } from '@nextui-org/react';
import { Formik, Form as FormikForm, FormikHelpers, FormikValues } from 'formik';

interface OtherProps {
    [x: string]: any;
}

interface Props {
    children: any;
    isLoading?: boolean;
    initialValues: OtherProps;
    validationSchema: OtherProps;
    onSubmit: (values: any, formikHelpers: FormikHelpers<FormikValues>) => void;
    className?: string;
    enableReinitialize?: boolean;
}

export default function Form({ children, className, isLoading, ...props }: Props) {
    return isLoading ? (
        <div className="flex justify-center items-center min-h-40">
            <Spinner label="Fetching data" color="warning" />
        </div>
    ) : (
        <Formik {...props}>
            <FormikForm className={className}>{children}</FormikForm>
        </Formik>
    );
}
