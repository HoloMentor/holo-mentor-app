import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import FormDropdown from '@/components/form/dropdown';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import { IRootState } from '@/redux';
import classServices from '@/redux/services/class.service';
import useErrorHandler from '@/hooks/error-handler';

const initialValues = {
    subjectId: '',
    teacherId: '', // Fixed typo here
    className: '',
    dayOfWeek: '', // Added missing field
    startTime: '',
    endTime: ''
};

const validationSchema = Yup.object().shape({
    subjectId: Yup.string().required('Subject is required'),
    teacherId: Yup.string().required('Teacher is required'),
    className: Yup.string().required('Class name is required'), // Corrected case
    dayOfWeek: Yup.string().required('Day of the week is required'), // Added validation for dayOfWeek
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

export default function AddClass() {

    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const [
        createClass,
        { isLoading: isClassCreating, isError: isClassCreateError, error: classCreateError }
    ] = classServices.useCreateMutation();

    useErrorHandler(isClassCreateError, classCreateError); // Fixed typo here

    const onSubmit = async (values: FormikValues) => {

        console.log(values);

        const formattedValues = {
            startTime: moment(values.startTime, 'HH:mm').format('HH:mm:ss'),
            endTime: moment(values.endTime, 'HH:mm').format('HH:mm:ss'),
        };

        const result = await createClass({
            instituteId: user.instituteId,
            subjectId: values.subjectId,
            teacherId: values.teacherId, 
            className: values.className,
            dayOfWeek: values.dayOfWeek, // Added missing field
            startTime: formattedValues.startTime,
            endTime: formattedValues.endTime,
        });

        if (result?.data?.status === 201 || result?.data?.status === 200) {
            dispatch(
                notifyActions.open({
                    type: 'success',
                    message: result.data.message
                })
            );

            dispatch(modelActions.hide());
        }
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
                <FormDropdown
                    label="Subject"
                    name="subjectId"
                    options={[
                        { value: '1', label: 'Subject 1' },
                        { value: '2', label: 'Subject 2' }
                    ]}
                />
                <FormDropdown
                    classNames={{ mainWrapper: 'w-full' }}
                    label="Teacher"
                    name="teacherId"
                    options={[
                        { value: '1', label: 'Teacher 1' },
                        { value: '2', label: 'Teacher 2' }
                    ]}
                />
                <FormInput label="Class name" placeholder="Class name" name="className" /> {/* Corrected name */}
                <FormDropdown
                    classNames={{ mainWrapper: 'w-full' }}
                    label="Day of the week"
                    name="dayOfWeek"
                    options={[
                        { value: '1', label: 'Monday' },
                        { value: '2', label: 'Tuesday' },
                        { value: '3', label: 'Wednesday' },
                        { value: '4', label: 'Thursday' },
                        { value: '5', label: 'Friday' },
                        { value: '6', label: 'Saturday' },
                        { value: '7', label: 'Sunday' }
                    ]}
                />
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
                <SubmitButton isLoading={isClassCreating} type="submit">
                    Create
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
