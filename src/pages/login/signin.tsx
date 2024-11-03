import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const initialValues = {
    email: ''
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required')
});

interface Props {
    onSubmit: (values: FormValues) => void;
    isLoading: boolean;
}

export default function LoginForm({ onSubmit, isLoading }: Props) {
    return (
        <div className="flex flex-col gap-9 items-center w-full max-w-[400px]">
            <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                className="flex flex-col w-full gap-6">
                <FormInput name="email" placeholder="example@example.com" label="Email" required />

                <SubmitButton
                    isLoading={isLoading}
                    type="submit"
                    className="py-4 w-full !max-w-full flex justify-center">
                    Next
                </SubmitButton>
            </Form>

            <span className="font-medium text-dark-gray">
                Are you new?{' '}
                <Link to="/signup" className="self-end font-medium mt-2">
                    Create an account
                </Link>
            </span>
        </div>
    );
}
