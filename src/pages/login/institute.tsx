import Form from '@/components/form';
import FormAutoComplete from '@/components/form/autocomplete';
import SubmitButton from '@/components/form/button';
import useErrorHandler from '@/hooks/error-handler';
import authServices from '@/redux/services/auth.service';
import { useMemo } from 'react';
import * as Yup from 'yup';

const initialValues = {
    institute: ''
};

const validationSchema = Yup.object().shape({
    institute: Yup.number().integer().required('Institute is required')
});

interface Props {
    data: {
        email?: string;
        password?: string;
    };
}

export default function InstituteForm({ data }: Props) {
    const {
        data: userInstitutes,
        error: userInstituteError,
        isError: isUserInstitutesError,
        isLoading: isUserInstitutesLoading
    } = authServices.useUserInstitutesQuery({
        email: data?.email
    });
    // error handling
    useErrorHandler(isUserInstitutesError, userInstituteError);

    const institutes = useMemo(() => {
        let template = [];

        if (userInstitutes?.data?.institutes) {
            template = userInstitutes.data.institutes.map((_: { id: number; name: string }) => {
                return {
                    value: _.id,
                    label: _.name
                };
            });
        }

        return template;
    }, [userInstitutes]);

    const onSubmit = (values: any) => {
        console.log(values);
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
                    isLoading={isUserInstitutesLoading}
                    name="institute"
                    label="Educational Institute"
                    placeholder="Select Institute"
                    defaultItems={institutes}
                />

                <SubmitButton type="submit" className="py-4 w-full !max-w-full flex justify-center">
                    Select
                </SubmitButton>
            </Form>
        </div>
    );
}
