import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import useErrorHandler from '@/hooks/error-handler';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import instituteServices from '@/redux/services/institute.service';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import moment from 'moment';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Institute name is required'),
    city: Yup.string().required('Institute city is required'),
    address: Yup.string().required('Institute address is required'),
    registrationNumber: Yup.string().required('Registration number is required'),
    establishedDate: Yup.date().required('Established date is required')
});

export default function EditInstitute({ data }: ModelContainerProps) {
    const dispatch = useDispatch();

    // mutations
    const [
        updateInstitute,
        { isLoading: isUpdating, isError: isInstituteUpdateError, error: instituteUpdateError }
    ] = instituteServices.useUpdateMutation();
    useErrorHandler(isInstituteUpdateError, instituteUpdateError);

    // query
    const {
        data: institute,
        isError: isInstituteError,
        error: instituteError,
        isLoading: isInstituteLoading
    } = instituteServices.useGetQuery(
        {
            id: data.id
        },
        {
            skip: !data.id
        }
    );
    useErrorHandler(isInstituteError, instituteError);

    const initialValues = useMemo(() => {
        const template = {
            name: '',
            city: '',
            address: '',
            registrationNumber: '',
            establishedDate: ''
        };

        if (institute?.data) {
            if (institute.data.name) template.name = institute.data.name;
            if (institute.data.city) template.city = institute.data.city;
            if (institute.data.address) template.address = institute.data.address;
            if (institute.data.registrationNumber)
                template.registrationNumber = institute.data.registrationNumber;
            if (institute.data.establishedDate)
                template.establishedDate = moment(institute.data.establishedDate).format(
                    'YYYY-MM-DD'
                );
        }

        return template;
    }, [institute]);

    const onSubmit = async (values: FormikValues) => {
        const result = await updateInstitute({ id: data.id, ...values });

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
                Edit Institute
            </ModalHeader>
            <Form
                isLoading={isInstituteLoading}
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
                className="flex flex-col gap-4">
                <ModalBody className="flex flex-col gap-4">
                    <p className="font-semibold">Institute Details</p>
                    <FormInput label="Name" placeholder="Name" name="name" />
                    <FormInput label="City" placeholder="City" name="city" />
                    <FormInput label="Address" placeholder="Address" name="address" />

                    <div className="grid grid-cols-2 gap-3">
                        <FormInput
                            label="Registration Number"
                            placeholder="Registration Number"
                            name="registrationNumber"
                        />
                        <FormInput
                            label="Established Date"
                            placeholder="Established Date"
                            name="establishedDate"
                            type="date"
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
