import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import useErrorHandler from '@/hooks/error-handler';
import authServices from '@/redux/services/auth.service';
import { useState } from 'react';
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
    onSubmit: (values: FormValues) => void;
}

export default function LoginForm({ onSubmit }: Props) {
    // mutations
    const [signIn, { isLoading: isSigning, isError: isSignInError, error: signInError }] =
        authServices.useSignInMutation();

    // error handler
    useErrorHandler(isSignInError, signInError);

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
