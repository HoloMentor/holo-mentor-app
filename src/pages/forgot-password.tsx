import { Link } from 'react-router-dom';
import Form from '@/components/form';
import * as Yup from 'yup';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';

const initialValues = {
    email: '',
    password: ''
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required')
});

export default function ForgotPassword() {
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="relative grid grid-cols-2 min-h-screen items-center justify-center justify-items-center px-[10%] py-6 max-lg:flex max-lg:flex-col bg-white">
            <div className="max-w-[800px] max-h-[800px] h-[80vw] w-[80vw] z-[-1] absolute top-[-120px] left-[-150px] bg-light-gray border rounded-full min-w-[400px] min-h-[400px]"></div>
            <div className="absolute bottom-0 right-0 overflow-hidden h-[120px] w-[400px] z-[-1]">
                <div className="w-[600px] h-[600px] bg-light-gray border rounded-full"></div>
            </div>

            <section className="flex justify-center w-full max-lg:hidden">
                <img src="/images/login.png" alt="Login" className="w-full" />
            </section>

            <section className="flex justify-center w-full">
                <div className="flex flex-col gap-9 items-center w-full max-w-[400px]">
                    <img src="/images/logo.svg" alt="Logo" className="w-full max-w-80" />

                    <h3 className="text-dark-green text-xl font-semibold">Reset your password</h3>

                    <p className="text-[#6B6B6B] text-center">
                        To reset your password, enter your email below and submit. An email will be
                        sent to you with instructions about how to complete the process.
                    </p>
                    <Form
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        className="flex flex-col w-full gap-6">
                        <FormInput
                            name="email"
                            placeholder="example@example.com"
                            label="Email"
                            required
                        />

                        <SubmitButton
                            type="submit"
                            className="py-4 w-full !max-w-full flex justify-center">
                            Reset Password
                        </SubmitButton>
                    </Form>

                    <span className="font-medium text-dark-gray">
                        Already have an account?{' '}
                        <Link to="/" className="self-end font-medium mt-2">
                            Login
                        </Link>
                    </span>
                </div>
            </section>
        </div>
    );
}
