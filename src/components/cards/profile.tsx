import useRoleHandler from '@/hooks/role-handler';
import { modelNames } from '@/models';
import { IRootState } from '@/redux';
import { modelActions } from '@/redux/reducers/model.reducer';
import { snakeCaseToTitleCase } from '@/utils';
import { Avatar } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileInfoCard() {
    const { user } = useSelector((state: IRootState) => state.user);
    const role = useRoleHandler();
    const dispatch = useDispatch();

    return (
        <div className="relative px-4 py-6 mb-4 bg-white rounded-lg">
            <div
                onClick={() =>
                    dispatch(
                        modelActions.show({
                            name: modelNames.PROFILE_USER_INFO
                        })
                    )
                }
                className="absolute right-4 top-4 cursor-pointer z-[+1]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                </svg>
            </div>

            <div>
                <Avatar src={user.image} alt="Avatar" className="w-24 h-24 mb-4 rounded-full" />
                <h1 className="text-2xl font-semibold">
                    {user.firstName} {user.lastName}
                </h1>
                <span className="text-sm text-neutral-500 capitalize">
                    {snakeCaseToTitleCase(role)}
                </span>
            </div>
        </div>
    );
}
