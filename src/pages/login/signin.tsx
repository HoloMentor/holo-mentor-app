import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const initialValues = {
    email: '',
    password: ''
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required')
});

interface Props {
    onSuccess: (x: number) => void;
}

export default function LoginForm({ onSuccess }: Props) {
    const onSubmit = (values: any) => {
        console.log(values);

        onSuccess(1);
    };

    return (
        <div className="flex flex-col gap-9 items-center w-full max-w-[400px]">
            <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                className="flex flex-col w-full gap-6">
                <FormInput name="email" placeholder="example@example.com" label="Email" required />

                <div className="flex flex-col">
                    <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="password"
                        required
                    />

                    <Link to="/forgot-password" className="self-end font-medium mt-2">
                        Forgot Password?
                    </Link>
                </div>

                <SubmitButton type="submit" className="py-4 w-full !max-w-full flex justify-center">
                    Sign In
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
