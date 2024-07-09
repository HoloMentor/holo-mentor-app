import Content from '@/components/content';
import Form from '@/components/form';
import FormAutoComplete from '@/components/form/autocomplete';
import SubmitButton from '@/components/form/button';
import FormEditor from '@/components/form/editor';
import Heading from '@/components/headings/main';
import SubHeading from '@/components/headings/sub';
import { FormikValues } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    topic: '',
    subTopic: '',
    question: ''
};

const validationSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    subTopic: Yup.string().required('Sub topic is required'),
    question: Yup.mixed().required('Question is required')
});

export default function ForumEssay() {
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };
    return (
        <div className="flex flex-col gap-3">
            <Heading>Forum</Heading>
            <Content>
                <SubHeading>Add Essay Question</SubHeading>

                <Form
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                        <FormAutoComplete
                            name="topic"
                            label="Topic"
                            placeholder="Select Topic"
                            defaultItems={[]}
                        />
                        <FormAutoComplete
                            name="subTopic"
                            label="Sub Topic"
                            placeholder="Select Sub Topic"
                            defaultItems={[]}
                        />
                    </div>

                    <FormEditor
                        className="min-h-72"
                        classNames={{
                            mainWrapper: 'col-span-2'
                        }}
                        label="Question"
                        name="question"
                    />

                    <SubmitButton className="mt-5">Submit Question</SubmitButton>
                </Form>
            </Content>
        </div>
    );
}
