import Button from '@/components/button';
import useErrorHandler from '@/hooks/error-handler';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import userServices from '@/redux/services/user.service';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useDispatch } from 'react-redux';

export default function SuspendUser({ id, isBlacklisted }: ModelContainerProps) {
    const dispatch = useDispatch();

    const [suspendRecord, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
        userServices.useSuspendMutation();
    useErrorHandler(isUpdateError, updateError);

    const onSubmit = async () => {
        const result = await suspendRecord({ id, isBlacklisted: !isBlacklisted });

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
            <ModalHeader className="flex flex-col gap-1">
                {isBlacklisted ? 'Revoke' : 'Suspend'} User Account
            </ModalHeader>
            <ModalBody>
                <p>Are you sure you want to proceed?</p>
            </ModalBody>

            <ModalFooter>
                <Button
                    isLoading={isUpdating}
                    className={isBlacklisted ? '' : 'bg-danger'}
                    onPress={onSubmit}>
                    Yes
                </Button>
            </ModalFooter>
        </div>
    );
}
