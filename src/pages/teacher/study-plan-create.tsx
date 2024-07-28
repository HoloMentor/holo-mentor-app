import Button from '@/components/button';
import FormEditor from '@/components/form/editor';
import Form from '@/components/form';
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

export default function studyPlanCreate() {
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };
    return (
        <div className="p-4 bg-white rounded-md shadow-custom">
            <h1 className="pb-8 text-2xl font-semibold text-dark-green">
                Create New Study Plan-Tier1
            </h1>
            <div className="pb-8 ml-6">
                <p className="pb-1 font-medium text-medium">Name of Study Plan</p>
                <input
                    className="w-3/4 pr-4 rounded-md placeholder:italic placeholder:pl-4 placeholder:text-slate-400"
                    placeholder="Ex: Rapid MCQ Plan"></input>
            </div>
            <div className="pb-8 ml-6">
                <p className="pb-1 font-medium text-medium">Description</p>
                <input
                    className="w-3/4 pr-4 rounded-md placeholder:italic placeholder:text-slate-400 placeholder:pl-4"
                    placeholder="Description"></input>
            </div>
            <section className="p-4 mb-8 ml-6 border-2 rounded-md">
                <h1 className="pb-4 text-xl font-medium">Task 01</h1>
                <div className="flex flex-col">
                    <p>Task Description</p>
                    <input className="w-3/4 pr-4 rounded-md placeholder:italic placeholder:text-slate-400"></input>
                    <Form
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4 pt-4">
                    

                    <FormEditor
                        className=" min-h-72"
                        classNames={{
                            mainWrapper: 'col-span-2'
                        }}
                        name="question"
                    />
                </Form>
                </div>
            </section>
            <div className="flex items-center justify-center gap-4 p-4 mb-4 ml-6 mr-4 transition-all duration-300 border-2 cursor-pointer rounded-3xl hover:shadow-md hover:bg-gray-100 active:bg-gray-200 active:shadow-inner">
                {' '}
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20 13.75V20M20 20V26.25M20 20H26.25M20 20H13.75M38.75 20C38.75 22.4623 38.265 24.9005 37.3227 27.1753C36.3805 29.4502 34.9993 31.5172 33.2583 33.2583C31.5172 34.9993 29.4502 36.3805 27.1753 37.3227C24.9005 38.265 22.4623 38.75 20 38.75C17.5377 38.75 15.0995 38.265 12.8247 37.3227C10.5498 36.3805 8.48285 34.9993 6.74175 33.2583C5.00065 31.5172 3.61953 29.4502 2.67726 27.1753C1.73498 24.9005 1.25 22.4623 1.25 20C1.25 15.0272 3.22544 10.2581 6.74175 6.74175C10.2581 3.22544 15.0272 1.25 20 1.25C24.9728 1.25 29.7419 3.22544 33.2583 6.74175C36.7746 10.2581 38.75 15.0272 38.75 20Z"
                        stroke="#6A6A6A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <p className="text-slate-400">Add New Task</p>
            </div>
            <div className="flex justify-center gap-4 align-middle">
                <Button className="bg-white border-2 rounded-md text-dark-green border-dark-green">
                    Cancel
                </Button>
                <Button className="text-white rounded-md">Create</Button>
            </div>
        </div>
    );
}
