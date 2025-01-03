import Content from '@/components/content';
import Form from '@/components/form';
import FormAutoComplete from '@/components/form/autocomplete';
import SubmitButton from '@/components/form/button';
import FormEditor from '@/components/form/editor';
import FormInput from '@/components/form/input';
import Heading from '@/components/headings/main';
import SubHeading from '@/components/headings/sub';
import { FieldArray, FormikValues } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    topic: '',
    subTopic: '',
    question: '',
    answers: [
        { index: 0, value: '' },
        { index: 1, value: '' },
        { index: 2, value: '' },
        { index: 3, value: '' },
        { index: 4, value: '' }
    ]
};

const validationSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    subTopic: Yup.string().required('Sub topic is required'),
    question: Yup.mixed().required('Question is required'),
    answers: Yup.array()
        .of(
            Yup.object().shape({
                value: Yup.string().required('Answer is required')
            })
        )
        .required('Answerers are required')
});

export default function ForumMcq() {
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };
    return (
        <div className="flex flex-col gap-3">
            <Heading>Forum</Heading>
            <Content>
                <SubHeading>Add MCQ Question</SubHeading>

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

                    <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
                        <FormEditor
                            className="min-h-52"
                            classNames={{
                                mainWrapper: 'col-span-2'
                            }}
                            label="Question"
                            name="question"
                        />
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-foreground">Answers</label>
                            <FieldArray
                                name="answers"
                                render={({ form: { values } }) => {
                                    return values?.answers?.map((_: any, i: number) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-gray-600">
                                                0{i + 1}
                                            </span>
                                            <FormInput
                                                placeholder={`Answer ${i + 1}`}
                                                name={`answers.${i}.value`}
                                                classNames={{ mainWrapper: 'w-full' }}
                                            />
                                        </div>
                                    ));
                                }}
                            />
                        </div>
                    </div>

                    <SubmitButton className="mt-5">Submit Question</SubmitButton>
                </Form>
            </Content>
        </div>
    );
}
