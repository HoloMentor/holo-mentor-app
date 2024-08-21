import Button from '@/components/button';
import Form from '@/components/form';
import FormInput from '@/components/form/input';
import FormAutoComplete from '@/components/form/autocomplete';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import { AutocompleteItem, Avatar, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const initialValues = {
    firstName: '',
    lastName: '',
    countryCode: '',
    contactNumber: ''
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    country: Yup.string().required('Country is required'),
    countryCode: Yup.string().required('Country Code is required'),
    contactNumber: Yup.number().required('Contact Number is required')
});

export default function ProfilePersonalInfo({ onClose }: ModelContainerProps) {
    const [telCodes, setTelCodes] = useState([]);
    const [countries, setCountries] = useState([]);

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

    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };
    return (
        <div>
            <ModalHeader className="flex flex-col gap-1 text-xl text-dark-green">
                Personal Information
            </ModalHeader>
            <ModalBody>
                <Form
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 max-sm:grid-cols-1">
                        <FormInput label="Email *" placeholder="Email" name="email" />
                        <FormAutoComplete
                            name="country"
                            label="Country *"
                            placeholder="Select Country"
                            isLoading={countries.length === 0}
                            defaultItems={countries}
                        />
                        <label className="text-sm">Contact Number *</label>

                        <div className="grid grid-cols-7 gap-4">
                            <div className="col-span-2">
                                {/* <FormInput name="countryCode" placeholder="+94" type="text" /> */}
                                <FormAutoComplete
                                    name="countryCode"
                                    placeholder="+94"
                                    isLoading={telCodes.length === 0}
                                    defaultItems={telCodes}
                                />
                            </div>
                            <div className="col-span-5">
                                <FormInput
                                    placeholder="Contact Number"
                                    name="contactNumber"
                                    type="number"
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button type="submit" form="form">
                    Save
                </Button>
            </ModalFooter>
        </div>
    );
}
