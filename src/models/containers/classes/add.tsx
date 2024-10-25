import Form from '@/components/form';
import FormAutoComplete from '@/components/form/autocomplete';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import useErrorHandler from '@/hooks/error-handler';
import { IRootState } from '@/redux';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import classServices from '@/redux/services/class/class.service';
import subjectServices from '@/redux/services/subject.service';
import teacherServices from '@/redux/services/teacher.service';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import moment from 'moment';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

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

export default function AddClass({}: ModelContainerProps) {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const DaysOfTheWeek = [
        { value: 'MON', label: 'Monday' },
        { value: 'TUE', label: 'Tuesday' },
        { value: 'WED', label: 'Wednesday' },
        { value: 'THU', label: 'Thursday' },
        { value: 'FRI', label: 'Friday' },
        { value: 'SAT', label: 'Saturday' },
        { value: 'SUN', label: 'Sunday' }
    ];

    const {
        data: instituteTeachers,
        isError: isInstituteTeachersError,
        error: instituteTeachersError,
        isLoading: isInstituteTeachersLoading
    } = teacherServices.useGetInstituteTeachersQuery(
        {
            instituteId: user.instituteId,
            search: '',
            page: 1
        },
        {
            skip: !user.instituteId
        }
    );
    useErrorHandler(isInstituteTeachersError, instituteTeachersError);

    const {
        data: instituteSubjects,
        isError: isInstituteSubjectsError,
        error: instituteSubjectsError,
        isLoading: isInstituteSubjectsLoading
    } = subjectServices.useGetInstituteSubjectsQuery(
        {
            instituteId: user.instituteId,
            search: '',
            page: 1
        },
        {
            skip: !user.instituteId
        }
    );
    useErrorHandler(isInstituteSubjectsError, instituteSubjectsError);

    const [
        createClass,
        { isLoading: isClassCreating, isError: isClassCreateError, error: classCreateError }
    ] = classServices.useCreateMutation();
    useErrorHandler(isClassCreateError, classCreateError); // Fixed typo here

    const onSubmit = async (values: FormikValues) => {
        const result = await createClass({
            instituteId: user.instituteId,
            subjectId: values.subjectId,
            teacherId: values.teacherId,
            className: values.className,
            dayOfWeek: values.dayOfWeek,
            startTime: moment(values.startTime, 'HH:mm').format('HH:mm:ss'),
            endTime: moment(values.endTime, 'HH:mm').format('HH:mm:ss')
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

    const instituteSubjectsOptions = useMemo(() => {
        let template = [];

        if (instituteSubjects?.data?.data?.length > 0) {
            template = instituteSubjects.data.data.map((subject: { name: string; id: number }) => {
                return {
                    value: subject.id,
                    label: subject.name
                };
            });
        }

        return template;
    }, [instituteSubjects]);

    const instituteTeachersOptions = useMemo(() => {
        let template = [];

        if (instituteTeachers?.data?.data?.length > 0) {
            template = instituteTeachers.data.data.map(
                (teacher: { firstName: string; lastName: string; id: number }) => {
                    return {
                        value: teacher.id,
                        label: `${teacher.firstName} ${teacher.lastName}`
                    };
                }
            );
        }

        return template;
    }, [instituteTeachers]);

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
                <FormAutoComplete
                    label="Subject"
                    name="subjectId"
                    isLoading={isInstituteSubjectsLoading}
                    isRequired
                    defaultItems={instituteSubjectsOptions}
                />
                <FormAutoComplete
                    label="Teacher"
                    name="teacherId"
                    isLoading={isInstituteTeachersLoading}
                    isRequired
                    defaultItems={instituteTeachersOptions}
                />
                <FormInput
                    label="Class name"
                    placeholder="Class name"
                    name="className"
                    isRequired
                />
                {/* Corrected name */}
                <FormAutoComplete
                    label="Day of the week"
                    name="dayOfWeek"
                    defaultItems={DaysOfTheWeek}
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
                <SubmitButton isLoading={isClassCreating} type="submit">
                    Create
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
