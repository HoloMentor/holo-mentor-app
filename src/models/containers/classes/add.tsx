import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

const initialValues = {
    subject: '',
    className: '',
    startTime: '',
    endTime: ''
};

const validationSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    className: Yup.string().required('className is required'),
    startTime: Yup.string()
        .required('Start time is required')
        .test('is-lesser', 'Start time should be lesser', function (value) {
            const { endTime } = this.parent;
            return moment(value, 'HH:mm').isBefore(moment(endTime, 'HH:mm'));
        }),
    endTime: Yup.string()
        .required('End time is required')
        .test('is-greater', 'End time should be greater', function (value) {
            const { startTime } = this.parent;
            return moment(value, 'HH:mm').isAfter(moment(startTime, 'HH:mm'));
        })
});

export default function AddClass({}: ModelContainerProps) {
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };

    return (
        <Form
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            className="flex flex-col gap-4">
            <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl">
                Create Class
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <FormInput label="Subject" placeholder="Subject" name="subject" />
                <FormInput label="Class name" placeholder="Class name" name="classname" />
                <div className="grid grid-cols-2 gap-3">
                    <FormInput
                        label="Start Time"
                        placeholder="Start Time"
                        name="startTime"
                        type="time"
                    />
                    <FormInput label="End Time" placeholder="End Time" name="endTime" type="time" />
                </div>
            </ModalBody>
            <ModalFooter>
                <SubmitButton type="submit">Create</SubmitButton>
            </ModalFooter>
        </Form>
    );
}
