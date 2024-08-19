import { useLocation } from 'react-router-dom';
import Form from '@/components/form';
import * as Yup from 'yup';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import { useMemo } from 'react';
import authServices from '@/redux/services/auth.service';
import useErrorHandler from '@/hooks/error-handler';
import { userActions } from '@/redux/reducers/user.reducer';
import { setCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';

const validationSchema = Yup.object().shape({
    reset: Yup.boolean(),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().when('reset', {
        is: true,
        then: (schema) =>
            schema
                .oneOf([Yup.ref('password'), ''], 'Passwords must match')
                .required('Confirm Password is required')
    })
});

export default function Invitation() {
    const dispatch = useDispatch();

    const location = useLocation();
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    // mutations
    const [invitationSignIn, { isLoading: isSigning, isError: isSignInError, error: signInError }] =
        authServices.useInvitationSignInMutation();
    useErrorHandler(isSignInError, signInError);

    // query
    const {
        data: invitation,
        isError: isInvitationError,
        error: invitationError,
        isLoading: isInvitationLoading
    } = authServices.useUserInvitationQuery(
        {
            token: searchParams.get('token')
        },
        {
            skip: !searchParams.get('token')
        }
    );
    useErrorHandler(isInvitationError, invitationError);

    const initialValues = useMemo(() => {
        const template = {
            reset: false,
            email: '',
            institute: '',
            password: '',
            confirmPassword: ''
        };

        if (searchParams.get('reset') === 'true') {
            template.reset = true;
            template.confirmPassword = '';
        }

        if (invitation?.data) {
            template.email = invitation.data.email;
            template.institute = invitation.data.institute_name;
        }

        return template;
    }, [searchParams, invitation]);

    const onSubmit = async (values: any) => {
        const result = await invitationSignIn({
            password: values.password,
            token: searchParams.get('token'),
            reset: searchParams.get('reset') === 'true'
        });

        if (result.data?.status === 200) {
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

            window.location.assign('/');

            /* set access token in a cookie */
            setCookie('token', result.data.data.access_token);
        }
    };

    return (
        <div className="relative grid grid-cols-2  gap-9 min-h-screen items-center justify-center justify-items-center px-[10%] py-6 max-lg:flex max-lg:flex-col bg-white">
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
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        className="flex flex-col w-full gap-6">
                        <FormInput
                            name="email"
                            placeholder="example@example.com"
                            label="Email"
                            required
                            readOnly
                        />

                        <FormInput
                            name="institute"
                            placeholder="Institute Name"
                            label="Institute Name"
                            required
                            readOnly
                        />

                        <FormInput
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="password"
                            required
                        />

                        {searchParams.get('reset') === 'true' && (
                            <FormInput
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                placeholder="Confirm password"
                                required
                            />
                        )}

                        <SubmitButton
                            isDisabled={isInvitationLoading}
                            isLoading={isSigning}
                            className="py-4 w-full !max-w-full flex justify-center">
                            Accept Invitation
                        </SubmitButton>
                    </Form>
                </div>
            </section>
            <section className="flex justify-center w-full max-lg:hidden z-[1]">
                <img src="/images/signup.png" alt="Login" className="w-full" />
            </section>
        </div>
    );
}
