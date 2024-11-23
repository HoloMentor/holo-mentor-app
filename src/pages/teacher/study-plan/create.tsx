import Content from '@/components/content';
import Form from '@/components/form';
import FormInput from '@/components/form/input';
import FormTextarea from '@/components/form/textarea';
import Heading from '@/components/headings/main';
import { FieldArray, FormikValues } from 'formik';
import * as Yup from 'yup';
import TaskEditor from './task';
import Button from '@/components/button';
import SubmitButton from '@/components/form/button';

const initialValues = {
    name: '',
    description: '',
    tasks: [{}]
};

const taskSchema = Yup.object().shape({
    name: Yup.string().required('Task name is required'),
    description: Yup.mixed().required('Task description is required')
});

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Study task is required'),
    description: Yup.string().required('Study description is required'),
    tasks: Yup.array().of(taskSchema).required('Tasks are required')
});

export default function studyPlanCreate() {
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };
    return (
        <div className="flex flex-col gap-3">
            <Heading>Create New Study Plan</Heading>

            <Content>
                <Form
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4 pt-4">
                    <FormInput
                        name="name"
                        label="Name of the study plan"
                        placeholder="Name of the study plan"
                        isRequired
                    />

                    <FormTextarea
                        name="description"
                        label="Description"
                        placeholder="Describe the study plan"
                        isRequired
                    />

                    <p className="text-medium">Tasks</p>
                    <FieldArray
                        name="tasks"
                        render={({ form: { values }, push }) => {
                            return (
                                <div className="flex flex-col gap-3">
                                    {values?.tasks?.map((_: any, i: number) => (
                                        <TaskEditor key={i} index={i} id={_.id || i} />
                                    ))}

                                    <Button
                                        variant="bordered"
                                        className="border-2 border-gray-200 p-6 border-dashed max-w-full"
                                        onClick={() =>
                                            push({
                                                id: values?.tasks?.length + 1,
                                                name: '',
                                                description: {}
                                            })
                                        }>
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M20 13.75V20M20 20V26.25M20 20H26.25M20 20H13.75M38.75 20C38.75 22.4623 38.265 24.9005 37.3227 27.1753C36.3805 29.4502 34.9993 31.5172 33.2583 33.2583C31.5172 34.9993 29.4502 36.3805 27.1753 37.3227C24.9005 38.265 22.4623 38.75 20 38.75C17.5377 38.75 15.0995 38.265 12.8247 37.3227C10.5498 36.3805 8.48285 34.9993 6.74175 33.2583C5.00065 31.5172 3.61953 29.4502 2.67726 27.1753C1.73498 24.9005 1.25 22.4623 1.25 20C1.25 15.0272 3.22544 10.2581 6.74175 6.74175C10.2581 3.22544 15.0272 1.25 20 1.25C24.9728 1.25 29.7419 3.22544 33.2583 6.74175C36.7746 10.2581 38.75 15.0272 38.75 20Z"
                                                stroke="#6A6A6A"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>

                                        <p className="text-slate-400">Add New Task</p>
                                    </Button>
                                </div>
                            );
                        }}
                    />

                    <div className="flex justify-end items-center">
                        <SubmitButton>Create</SubmitButton>
                    </div>
                </Form>
            </Content>
        </div>
    );
}
