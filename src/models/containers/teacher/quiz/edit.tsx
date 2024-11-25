import Button from '@/components/button';
import Form from '@/components/form';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import Content from '@/components/content';
import FormAutoComplete from '@/components/form/autocomplete';
import FormEditor from '@/components/form/editor';
import { FieldArray, FormikValues } from 'formik';
import * as Yup from 'yup';

interface ModelContainerProps {
    onClose: () => void;
}

const initialValues = {
    firstName: '',
    lastName: '',
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
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required')
});

export default function ProfileUserInfo({ onClose }: ModelContainerProps) {
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };

    return (
        <div className="max-w-3xl justify-center">
            <ModalHeader className="flex  flex-col gap-1 text-xl text-dark-green w-6xl">
                Edit MCQ
            </ModalHeader>
            <ModalBody className="max-h-96 overflow-y-auto">
                <Content>
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

                        <div className="grid grid-cols-1 gap-4 max-lg:grid-cols-1">
                            <FormEditor
                                className="min-h-52 w-full"
                                classNames={{
                                    mainWrapper: 'col-span-2'
                                }}
                                label="Question"
                                name="question"
                            />
                        </div>
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
                                            {/* <FormInput
                                                placeholder={`Answer ${i + 1}`}
                                                name={`answers.${i}.value`}
                                                classNames={{ mainWrapper: 'w-full' }}
                                            /> */}
                                            <FormEditor
                                                className="min-h-20 w-full"
                                                classNames={{
                                                    mainWrapper: 'w-full'
                                                }}
                                                name={`answers.${i}.value`}
                                            />
                                        </div>
                                    ));
                                }}
                            />
                        </div>
                        <div>
                            <div>
                                <FormAutoComplete
                                    name="answer"
                                    label="Correct Answer"
                                    placeholder="Select Topic"
                                    defaultItems={[
                                        { label: 'Answer 01', value: '1' },
                                        { label: 'Answer 02', value: '2' },
                                        { label: 'Answer 03', value: '3' },
                                        { label: 'Answer 04', value: '4' },
                                        { label: 'Answer 05', value: '5' }
                                    ]}
                                />
                            </div>
                        </div>
                    </Form>
                </Content>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" form="form">
                    Update Question
                </Button>
            </ModalFooter>
        </div>
    );
}
