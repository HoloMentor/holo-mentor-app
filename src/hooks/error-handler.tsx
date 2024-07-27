import { notifyActions } from '@/redux/reducers/notify.reducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useErrorHandler = (isError: boolean, error?: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError && error) {
            dispatch(
                notifyActions.open({
                    type: 'error',
                    message: error?.message
                })
            );
        }
    }, [isError, error]);
};

export default useErrorHandler;
