import Content from '@/components/content';
import Form, { FormikInnerRef } from '@/components/form';
import FormAutoComplete from '@/components/form/autocomplete';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import useErrorHandler from '@/hooks/error-handler';
import { IRootState } from '@/redux';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import classMaterialServices from '@/redux/services/class/materials.service';
import classTopicServices from '@/redux/services/class/topics.service';
import { ModalBody, ModalFooter, ModalHeader, user } from '@nextui-org/react';
import { FormikValues } from 'formik';
import { Fragment, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const types = [
    { value: 'URL', label: 'URL' },
    { value: 'PDF', label: 'PDF' },
    { value: 'VIDEO', label: 'Video' },
    { value: 'FILE', label: 'File' }
];

const initialValues = {
    topic: '',
    subTopic: '',
    materialType: 'URL',
    materialData: ''
};

const validationSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    subTopic: Yup.string().required('Sub topic is required'),
    materialType: Yup.string().required('Material type is required'),
    materialData: Yup.string().required('Material data is required')
});

export default function AddMaterials({ classId }: ModelContainerProps) {
    const dispatch = useDispatch();
    const formRef = useRef<FormikInnerRef>(null);
    const { user } = useSelector((state: IRootState) => state.user);

    /* create */
    const [
        createMaterial,
        {
            isError: isClassMaterialCreateError,
            error: classMaterialCreateError,
            isLoading: isCreating
        }
    ] = classMaterialServices.useCreateMutation();
    useErrorHandler(isClassMaterialCreateError, classMaterialCreateError);

    /* get class topics */
    const {
        data: classTopics,
        isLoading: isClassTopicsLoading,
        error: classTopicsError,
        isError: isClassTopicsError
    } = classTopicServices.useGetClassTopicsQuery(
        {
            classId: classId,
            materials: false
        },
        {
            skip: !classId
        }
    );
    useErrorHandler(isClassTopicsError, classTopicsError);

    const classTopicsData = useMemo(() => {
        if (classTopics?.data) {
            return classTopics.data.map((_: { id: number | string; name: string }) => {
                return {
                    value: _.id,
                    label: _.name
                };
            });
        }

        return [];
    }, [classTopics]);

    const getClassSubTopics = useCallback(
        (topicId: number | string): { value: string; label: string }[] => {
            if (!topicId) return [];

            return (
                classTopics.data
                    .find((_: { id: number | string }) => _.id.toString() === topicId.toString())
                    ?.subTopics?.map((_: { id: number | string; name: string }) => {
                        return {
                            value: _.id,
                            label: _.name
                        };
                    }) || []
            );
        },
        [classTopics]
    );

    const onSubmit = async (v: FormikValues) => {
        const result = await createMaterial({
            classId,
            instituteId: user.instituteId,
            topicId: v.topic,
            subTopicId: v.subTopic,
            type: v.materialType,
            url: v.materialData
        });

        if (result?.data?.status === 201) {
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
            innerRef={formRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ values, setFieldValue }) => {
                const subTopicsData = getClassSubTopics(values.topic);

                return (
                    <Fragment>
                        <ModalHeader className="flex flex-col gap-1 text-xl text-dark-green">
                            Add Study Materials
                        </ModalHeader>
                        <ModalBody>
                            <Content>
                                <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                                    <FormAutoComplete
                                        label="Select a topic"
                                        name="topic"
                                        defaultItems={classTopicsData}
                                        isRequired
                                        isLoading={isClassTopicsLoading}
                                        onSelectionChange={() => setFieldValue('subTopic', '')}
                                    />
                                    <FormAutoComplete
                                        isDisabled={!values.topic}
                                        label="Select a sub topic"
                                        name="subTopic"
                                        defaultItems={subTopicsData}
                                        isRequired
                                    />
                                </div>
                                <div className="grid grid-cols-[35%,65%] gap-3 max-sm:grid-cols-1">
                                    <FormAutoComplete
                                        label="Select a type"
                                        name="materialType"
                                        defaultItems={types}
                                        isRequired
                                    />
                                    <FormInput
                                        isRequired
                                        label="Enter the URL"
                                        name="materialData"
                                        placeholder="Enter the URL"
                                        className="w-full"
                                        type={
                                            ['FILE', 'PDF'].includes(values.materialType)
                                                ? 'file'
                                                : 'text'
                                        }
                                    />
                                </div>
                            </Content>
                        </ModalBody>
                        <ModalFooter>
                            <SubmitButton isLoading={isCreating} type="submit" form="form">
                                Upload
                            </SubmitButton>
                        </ModalFooter>
                    </Fragment>
                );
            }}
        </Form>
    );
}
