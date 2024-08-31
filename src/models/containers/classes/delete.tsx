import Button from '@/components/button';
import useErrorHandler from '@/hooks/error-handler';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import classServices from '@/redux/services/class.service';

export default function DeleteClass({ id }: ModelContainerProps) {
    const dispatch = useDispatch();

    const [deleteRecord, { isLoading: isDeleting, isError: isDeleteError, error: deleteError }] =
        classServices.useDeleteMutation();
    useErrorHandler(isDeleteError, deleteError);

    const onSubmit = async () => {
        const result = await deleteRecord({ id });

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
        <div>
            <ModalHeader className="flex flex-col gap-1">Delete Class</ModalHeader>
            <ModalBody>
                <p>This action cannot be reversed, are you sure you want to proceed?</p>
            </ModalBody>

            <ModalFooter>
                <Button isLoading={isDeleting} className="bg-danger" onPress={onSubmit}>
                    Yes
                </Button>
            </ModalFooter>
        </div>
    );
}
