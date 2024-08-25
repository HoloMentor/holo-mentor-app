import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import useErrorHandler from '@/hooks/error-handler';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import classServices from '@/redux/services/class.service'; 
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import moment from 'moment';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    className: Yup.string().required('Class name is required'),
    startTime: Yup.string()
        .required('Start time is required')
        .test('is-lesser', 'Start time should be lesser than end time', function (value) {
            const { endTime } = this.parent;
            return moment(value, 'HH:mm').isBefore(moment(endTime, 'HH:mm'));
        }),
    endTime: Yup.string()
        .required('End time is required')
        .test('is-greater', 'End time should be greater than start time', function (value) {
            const { startTime } = this.parent;
            return moment(value, 'HH:mm').isAfter(moment(startTime, 'HH:mm'));
        })
});

export default function EditClass({ data }: ModelContainerProps) {
    const dispatch = useDispatch();

    const [
        updateClass,
        { isLoading: isUpdating, isError: isClassUpdateError, error: classUpdateError }
    ] = classServices.useUpdateMutation(); 
    useErrorHandler(isClassUpdateError, classUpdateError);

    const {
        data: classData,
        isError: isClassError,
        error: classError,
        isLoading: isClassLoading
    } = classServices.useGetQuery(
        {
            id: data.id
        },
        {
            skip: !data.id
        }
    );
    useErrorHandler(isClassError, classError);

    const initialValues = useMemo(() => {
        const template = {
            subject: '',
            className: '',
            startTime: '',
            endTime: ''
        };

        if (classData?.data) {
            if (classData.data.subject) template.subject = classData.data.subject;
            if (classData.data.className) template.className = classData.data.className;
            if (classData.data.startTime) template.startTime = classData.data.startTime;
            if (classData.data.endTime) template.endTime = classData.data.endTime;
        }

        return template;
    }, [classData]);

    const onSubmit = async (values: FormikValues) => {
        const result = await updateClass({ id: data.id, ...values });

        if (result?.data?.status === 200) {
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
        <div className="flex flex-col gap-4">
            <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl">
                Edit Class
            </ModalHeader>
            <Form
                isLoading={isClassLoading}
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
                className="flex flex-col gap-4">
                <ModalBody className="flex flex-col gap-4">
                    <FormInput label="Subject" placeholder="Subject" name="subject" isRequired />
                    <FormInput
                        label="Class name"
                        placeholder="Class name"
                        name="className"
                        isRequired
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <FormInput
                            label="Start Time"
                            placeholder="Start Time"
                            name="startTime"
                            type="time"
                            isRequired
                        />
                        <FormInput
                            label="End Time"
                            placeholder="End Time"
                            name="endTime"
                            type="time"
                            isRequired
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <SubmitButton isLoading={isUpdating} type="submit" form="form">
                        Save
                    </SubmitButton>
                </ModalFooter>
            </Form>
        </div>
    );
}
