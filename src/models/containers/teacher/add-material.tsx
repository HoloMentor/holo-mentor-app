import Button from '@/components/button';
import Content from '@/components/content';
import Form, { FormikInnerRef } from '@/components/form';
import FormAutoComplete from '@/components/form/autocomplete';
import FormInput from '@/components/form/input';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import { Fragment, useRef } from 'react';
import * as Yup from 'yup';

interface ModelContainerProps {
    onClose: () => void;
}

const topics = [
    { value: 'mechanics', label: 'Mechanics' },
    { value: 'electricity-and-magnetism', label: 'Electricity and Magnetism' },
    { value: 'waves', label: 'Waves' },
    { value: 'atomic-and-nuclear-physics', label: 'Atomic and Nuclear Physics' }
];

const types = [
    { value: 'link', label: 'URL' },
    { value: 'pdf', label: 'PDF' }
];

const subTopics = [
    { value: 'kinematics', label: 'Kinematics' },
    { value: 'dynamics', label: 'Dynamics' },
    { value: 'circular-motion', label: 'Circular Motion' },
    { value: 'gravitational-fields', label: 'Gravitational Fields' },
    { value: 'thermal-physics', label: 'Thermal Physics' },
    { value: 'electric-fields', label: 'Electric Fields' },
    { value: 'current-electricity', label: 'Current Electricity' },
    { value: 'electromagnetism', label: 'Electromagnetism' },
    { value: 'electromagnetic-induction', label: 'Electromagnetic Induction' },
    { value: 'oscillations', label: 'Oscillations' },
    { value: 'superposition', label: 'Superposition' },
    { value: 'interference', label: 'Interference' },
    { value: 'diffraction', label: 'Diffraction' },
    { value: 'doppler-effect', label: 'Doppler Effect' },
    { value: 'atomic-structure', label: 'Atomic Structure' },
    { value: 'nuclear-physics', label: 'Nuclear Physics' },
    { value: 'medical-physics', label: 'Medical Physics' }
];

const initialValues = {
    topic: '',
    subTopic: '',
    materialType: '',
    materialData: ''
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required')
});

export default function AddMaterials({ onClose }: ModelContainerProps) {
    const formRef = useRef<FormikInnerRef>(null);
    console.log(formRef.current?.values);
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };

    return (
        <Form
            innerRef={formRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            className="w-6xl">
            {({ values }) => {
                return (
                    <Fragment>
                        <ModalHeader className="flex flex-col gap-1 text-xl text-dark-green w-6xl">
                            Add Study Materials
                        </ModalHeader>
                        <ModalBody>
                            <Content>
                                <div className="grid grid-cols-2 gap-3">
                                    <FormAutoComplete
                                        label="Select a topic"
                                        name="topic"
                                        defaultItems={topics}
                                        isRequired
                                    />
                                    <FormAutoComplete
                                        label="Select a sub topic"
                                        name="subTopic"
                                        defaultItems={subTopics}
                                        isRequired
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <FormAutoComplete
                                        label="Select a type"
                                        name="materialType"
                                        defaultItems={types}
                                        isRequired
                                    />
                                    <FormInput
                                        label="Enter the URL"
                                        name="materialData"
                                        placeholder="Enter the URL"
                                        className="w-full"
                                        type={values.materialType === 'pdf' ? 'file' : 'text'}
                                    />
                                </div>
                            </Content>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" form="form">
                                Upload
                            </Button>
                        </ModalFooter>
                    </Fragment>
                );
            }}
        </Form>
    );
}
