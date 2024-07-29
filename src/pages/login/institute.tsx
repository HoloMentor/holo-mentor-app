import Form from '@/components/form';
import FormAutoComplete from '@/components/form/autocomplete';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import useErrorHandler from '@/hooks/error-handler';
import { userActions } from '@/redux/reducers/user.reducer';
import authServices from '@/redux/services/auth.service';
import { setCookie } from 'cookies-next';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const initialValues = {
    institute: '',
    password: ''
};

const validationSchema = Yup.object().shape({
    institute: Yup.number().integer().required('Institute is required'),
    password: Yup.string().required('Password is required')
});

interface Props {
    data: {
        email?: string;
    };
    userInstitutes: any[];
    loading: boolean;
}

export default function InstituteForm({ data, userInstitutes = [], loading }: Props) {
    const dispatch = useDispatch();

    // mutations
    const [signIn, { isLoading: isSigning, isError: isSignInError, error: signInError }] =
        authServices.useSignInMutation();

    // error handler

    useErrorHandler(isSignInError, signInError);

    const institutes = useMemo(() => {
        let template: any[] = [];

        if (userInstitutes) {
            template = userInstitutes.map((_: { id: number; name: string }) => {
                return {
                    value: _.id,
                    label: _.name
                };
            });
        }

        return template;
    }, [userInstitutes]);

    const onSubmit = async (values: any) => {
        const result = await signIn({
            email: data.email,
            password: values.password,
            userInstituteID: values.institute
        });

        if (result.data.status === 200) {
            dispatch(
                userActions.set({
                    userId: result.data.data.user_id,
                    instituteId: result.data.data.institute_id,
                    userInstituteId: result.data.data.user_institute_id,
                    email: result.data.data.email,
                    firstName: result.data.data.first_name,
                    lastName: result.data.data.last_name,
                    userRole: result.data.data.user_role,
                    instituteRole: result.data.data.institute_role
                })
            );

            /* set access token in a cookie */
            setCookie('token', result.data.data.access_token);
        }
    };

    return (
        <div className="flex flex-col gap-9 items-center w-full max-w-[400px]">
            <h3 className="text-dark-green text-xl font-semibold">
                Select a Institute to Continue
            </h3>

            <p className="text-[#6B6B6B] text-center">
                Bellow mention are the educational institute that you have registered. select one to
                login
            </p>

            <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                className="flex flex-col w-full gap-6">
                <FormAutoComplete
                    isLoading={loading}
                    name="institute"
                    label="Educational Institute"
                    placeholder="Select Institute"
                    defaultItems={institutes}
                />

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

                <SubmitButton
                    isLoading={isSigning}
                    type="submit"
                    className="py-4 w-full !max-w-full flex justify-center">
                    Sign In
                </SubmitButton>
            </Form>
        </div>
    );
}
