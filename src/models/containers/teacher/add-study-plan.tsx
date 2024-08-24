import Button from '@/components/button';
import Form from '@/components/form';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import Content from '@/components/content';
import FormAutoComplete from '@/components/form/autocomplete';
import SubmitButton from '@/components/form/button';
import FormEditor from '@/components/form/editor';
import FormInput from '@/components/form/input';
import SubHeading from '@/components/headings/sub';
import { FieldArray, FormikValues } from 'formik';
import * as Yup from 'yup';

interface ModelContainerProps {
    onClose: () => void;
}

const initialValues = {
    firstName: '',
    lastName: ''
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required')
});

export default function AddStudyPlan({ onClose }: ModelContainerProps) {
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };

    return (
        <div className="w-6xl">
            <ModalHeader className="flex flex-col gap-1 text-xl text-dark-green w-6xl">
                Add New MCQ
            </ModalHeader>
            <ModalBody>
                <Content>
                    <SubHeading>Add MCQ Question</SubHeading>

                    <Form
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        className="flex flex-col gap-4">
                        <div className="grid w-full grid-cols-2 gap-4 max-sm:grid-cols-1">
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
            </ModalBody>
            <ModalFooter>
                <Button type="submit" form="form">
                    Save
                </Button>
            </ModalFooter>
        </div>
    );
}