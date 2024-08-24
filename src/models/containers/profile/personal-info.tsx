import Button from '@/components/button';
import Form from '@/components/form';
import FormInput from '@/components/form/input';
import FormAutoComplete from '@/components/form/autocomplete';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import { AutocompleteItem, Avatar, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import userServices from '@/redux/services/user.service';
import useErrorHandler from '@/hooks/error-handler';
import SubmitButton from '@/components/form/button';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/redux';
import { userActions } from '@/redux/reducers/user.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import { modelActions } from '@/redux/reducers/model.reducer';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    country: Yup.string().required('Country is required'),
    countryCode: Yup.string().required('Country Code is required'),
    contactNumber: Yup.number().required('Contact Number is required')
});

export default function ProfilePersonalInfo({ onClose }: ModelContainerProps) {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);
    const [telCodes, setTelCodes] = useState([]);
    const [countries, setCountries] = useState([]);

    const {
        data: userData,
        isError: isUserError,
        error: userError,
        isLoading: isUserLoading
    } = userServices.useGetQuery(
        {
            id: user.userId
        },
        {
            skip: !user.userId
        }
    );
    useErrorHandler(isUserError, userError);

    const initialValues = useMemo(() => {
        const template = {
            email: '',
            country: '',
            countryCode: '',
            contactNumber: ''
        };

        if (userData?.data?.email) template.email = userData.data.email;
        if (userData?.data?.country) template.country = userData.data.country;
        if (userData?.data?.countryCode) template.countryCode = userData.data.countryCode;
        if (userData?.data?.contactNumber) template.contactNumber = userData.data.contactNumber;

        return template;
    }, [userData]);

    const [update, { isError: isUpdateError, error: updateError, isLoading: isUpdating }] =
        userServices.useUpdateInfoMutation();
    useErrorHandler(isUpdateError, updateError);

    const fetchTelCodes = useMemo(
        () => async () => {
            const res = await axios.get(`${window.location.origin}/assets/country-codes.json`);
            let telCodes = res.data.map((_: { name: string; dial_code: string; code: string }) => {
                return {
                    label: _.dial_code,
                    key: `tel-${_.code}`,
                    value: _.dial_code
                };
            });

            let countries = res.data.map((_: { name: string; dial_code: string; code: string }) => {
                return {
                    label: _.name,
                    key: `country-${_.code}`,
                    value: _.name
                };
            });

            setCountries(countries);
            setTelCodes(telCodes);

            return true;
        },
        []
    );

    useEffect(() => {
        fetchTelCodes();
    }, [fetchTelCodes]);

    const onSubmit = async (values: FormikValues) => {
        // remove email value from the data set
        if (values.email) delete values.email;
        const result = await update({
            id: user.userId,
            ...values
        });

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
         <Form
            isLoading={isUserLoading}
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}>
            <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl">
                Personal Information
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 max-sm:grid-cols-1">
                    <FormInput label="Email" placeholder="Email" name="email" readOnly isRequired />
                    <FormAutoComplete
                        name="country"
                        label="Country"
                        placeholder="Select Country"
                        isLoading={countries.length === 0}
                        defaultItems={countries}
                        isRequired
                    />
                    <label className="text-sm">Contact Number</label>

                    <div className="grid grid-cols-7 gap-4">
                        <div className="col-span-2">
                            {/* <FormInput name="countryCode" placeholder="+94" type="text" /> */}
                            <FormAutoComplete
                                name="countryCode"
                                placeholder="+94"
                                isLoading={telCodes.length === 0}
                                defaultItems={telCodes}
                                isRequired
                            />
                        </div>
                        <div className="col-span-5">
                            <FormInput
                                placeholder="Contact Number"
                                name="contactNumber"
                                type="number"
                                isRequired
                            />
                        </div>
                    </div>
                </div>
            </ModalBody>

            <ModalFooter>
                <SubmitButton form="form">Save</SubmitButton>
            </ModalFooter>
        </Form>
    );
}
