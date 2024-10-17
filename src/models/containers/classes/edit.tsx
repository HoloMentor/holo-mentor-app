import { useMemo } from 'react';
import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import FormDropdown from '@/components/form/dropdown';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import { modelActions } from '@/redux/reducers/model.reducer';
import { IRootState } from '@/redux';
import classServices from '@/redux/services/class.service';
import useErrorHandler from '@/hooks/error-handler';
import teacherServices from '@/redux/services/teacher.service';
import subjectServices from '@/redux/services/subject.service';
import moment from 'moment';
import { FormikValues } from 'formik';

const validationSchema = Yup.object().shape({
    subjectId: Yup.string(),
    teacherId: Yup.string(),
    className: Yup.string(),
    dayOfWeek: Yup.string(),
    startTime: Yup.string()
        .required('Start time is required')
        .test('is-lesser', 'Start time should be earlier than End time', function (value) {
            const { endTime } = this.parent;
            return moment(value, 'HH:mm').isBefore(moment(endTime, 'HH:mm'));
        }),
    endTime: Yup.string()
        .required('End time is required')
        .test('is-greater', 'End time should be later than Start time', function (value) {
            const { startTime } = this.parent;
            return moment(value, 'HH:mm').isAfter(moment(startTime, 'HH:mm'));
        })
});

export default function EditClass({ data }: ModelContainerProps) {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const { data: instituteTeachers } = teacherServices.useGetInstituteTeachersQuery(
        { instituteId: user.instituteId, search: '', page: 1 },
        { skip: !user.instituteId }
    );

    const { data: instituteSubjects } = subjectServices.useGetInstituteSubjectsQuery(
        { instituteId: user.instituteId, search: '', page: 1 },
        { skip: !user.instituteId }
    );

    const [
        updateClass,
        { isLoading: isClassUpdating, isError: isClassUpdateError, error: classUpdateError }
    ] = classServices.useUpdateMutation();
    useErrorHandler(isClassUpdateError, classUpdateError);

    const {
        data: classData,
        isError: isClassLoadingError,
        error: classLoadingError
    } = classServices.useGetQuery(
        {
            id: data.id
        },
        {
            skip: !data.id
        }
    );

    useErrorHandler(isClassLoadingError, classLoadingError);

    const initialValues = useMemo(() => {
        if (classData?.data) {
            return {
                subjectId: classData.data.subjectId || '',
                teacherId: classData.data.teacherId || '',
                className: classData.data.className || '',
                dayOfWeek: classData.data.dayOfWeek || '',
                startTime: moment(classData.data.startTime, 'HH:mm:ss').format('HH:mm') || '',
                endTime: moment(classData.data.endTime, 'HH:mm:ss').format('HH:mm') || ''
            };
        }
        return {
            subjectId: '',
            teacherId: '',
            className: '',
            dayOfWeek: '',
            startTime: '',
            endTime: ''
        };
    }, [classData]);

    const onSubmit = async (values: FormikValues) => {
        const formattedValues = {
            startTime: moment(values.startTime, 'HH:mm').format('HH:mm:ss'),
            endTime: moment(values.endTime, 'HH:mm').format('HH:mm:ss')
        };

        const result = await updateClass({
            id: data.id,
            instituteId: user.instituteId,
            subjectId: values.subjectId,
            teacherId: values.teacherId,
            className: values.className,
            dayOfWeek: values.dayOfWeek,
            startTime: formattedValues.startTime,
            endTime: formattedValues.endTime
        });

        if (result?.data?.status === 200 || result?.data?.status === 201) {
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
                Edit Class
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <FormDropdown
                    label="Subject"
                    name="subjectId"
                    options={
                        instituteSubjects?.data?.data?.length > 0
                            ? instituteSubjects.data.data.map((subject: any) => ({
                                  value: subject.id,
                                  label: subject.name
                              }))
                            : []
                    }
                />
                <FormDropdown
                    label="Teacher"
                    name="teacherId"
                    options={
                        instituteTeachers?.data?.data?.length > 0
                            ? instituteTeachers.data.data.map((teacher: any) => ({
                                  value: teacher.id,
                                  label: `${teacher.firstName} ${teacher.lastName}`
                              }))
                            : []
                    }
                />
                <FormInput label="Class name" placeholder="Class name" name="className" />
                <FormDropdown
                    label="Day of the week"
                    name="dayOfWeek"
                    options={[
                        { value: 'MON', label: 'Monday' },
                        { value: 'TUE', label: 'Tuesday' },
                        { value: 'WED', label: 'Wednesday' },
                        { value: 'THU', label: 'Thursday' },
                        { value: 'FRI', label: 'Friday' },
                        { value: 'SAT', label: 'Saturday' },
                        { value: 'SUN', label: 'Sunday' }
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
                <SubmitButton isLoading={isClassUpdating} type="submit">
                    Edit
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
