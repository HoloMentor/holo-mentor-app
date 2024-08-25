import { Spinner } from '@nextui-org/react';
import { Formik, Form as FormikForm, FormikHelpers, FormikProps, FormikValues } from 'formik';

export type FormikInnerRef = FormikProps<any>;

interface OtherProps {
    [x: string]: any;
}

interface Props {
    innerRef?: React.MutableRefObject<FormikInnerRef>;
    children: React.ReactNode | ((props: FormikProps<any>) => React.ReactNode);
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
            {typeof children === 'function' ? (
                (formikProps) => (
                    <FormikForm className={className}>{children(formikProps)}</FormikForm>
                )
            ) : (
                <FormikForm className={className}>{children}</FormikForm>
            )}
        </Formik>
    );
}
