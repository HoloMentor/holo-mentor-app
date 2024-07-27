import Form from '@/components/form';
import FormAutoComplete from '@/components/form/autocomplete';
import SubmitButton from '@/components/form/button';
import * as Yup from 'yup';

const initialValues = {
    institute: ''
};

const validationSchema = Yup.object().shape({
    institute: Yup.number().integer().required('Institute is required')
});

export default function InstituteForm() {
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
                    name="institute"
                    label="Educational Institute"
                    placeholder="Select Institute"
                    defaultItems={[]}
                />

                <SubmitButton type="submit" className="py-4 w-full !max-w-full flex justify-center">
                    Select
                </SubmitButton>
            </Form>
        </div>
    );
}
