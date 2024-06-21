import { Link } from 'react-router-dom';
import Form from '../form';
import * as Yup from 'yup';
import SubmitButton from '../form/button';
import FormInput from '../form/input';

const initialValues = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const validationSchema = Yup.object().shape({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Confirm Password is required')
});

export default function Login() {
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="relative grid grid-cols-2 min-h-screen items-center justify-center justify-items-center px-[10%] py-6 max-lg:flex max-lg:flex-col bg-white">
            <div className="absolute bottom-0 right-0 overflow-hidden w-full h-full transform scale-x-[-1] scale-y-[-1] z-[0]">
                <div className="max-w-[800px] max-h-[800px] h-[80vw] w-[80vw] absolute top-[-200px] left-[-150px] bg-[#F9F9F9] rounded-full min-w-[400px] min-h-[400px]"></div>
            </div>
            <div className="absolute top-0 left-0 overflow-hidden h-[120px] w-[400px] transform scale-x-[-1] scale-y-[-1] z-[0]">
                <div className="w-[600px] h-[600px] bg-[#F9F9F9] rounded-full "></div>
            </div>

            <section className="flex justify-center w-full z-[2]">
                <div className="flex flex-col gap-9 items-center w-full max-w-[450px]">
                    <img src="/images/logo.svg" alt="Logo" className="w-full max-w-80" />
                    <Form
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        className="flex flex-col w-full gap-6">
                        <div className="flex flex-row w-full justify-between gap-5 sm:gap-2">
                            <FormInput
                                name="fname"
                                placeholder="First Name"
                                label="First Name"
                                required
                            />
                            <FormInput
                                name="lname"
                                placeholder="Last Name"
                                label="Last Name"
                                required
                            />
                        </div>
                        <FormInput name="email" placeholder="Email" label="Email" required />

                        <FormInput
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="password"
                            required
                        />

                        <FormInput
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            placeholder="Confirm password"
                            required
                        />

                        <SubmitButton type="submit" className="py-4">
                            Sign Up
                        </SubmitButton>
                    </Form>

                    <span className="font-medium text-dark-gray">
                        Already have an accpunt?{' '}
                        <Link to="/" className="self-end font-medium mt-2">
                            Login
                        </Link>
                    </span>
                </div>
            </section>
            <section className="flex justify-center w-full max-lg:hidden z-[1]">
                <img src="/images/signup.png" alt="Login" className="w-full" />
            </section>
        </div>
    );
}
