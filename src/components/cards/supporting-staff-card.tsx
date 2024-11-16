import { useDispatch } from 'react-redux';
import { modelActions } from '@/redux/reducers/model.reducer';
import { modelNames } from '@/models';

const SupportingStaff: React.FC = () => {
    const dispatch = useDispatch();

    const staffMembers = [
        { id: '1', name: 'John Stark', avatar: '/images/student/avatar-hd.jpg' },
        { id: '2', name: 'Tony Reichert', avatar: '/images/student/avatar-hd.jpg' },
        { id: '3', name: 'Zoey Lang', avatar: '/images/student/avatar-hd.jpg' },
        { id: '4', name: 'Jane Fisher', avatar: '/images/student/avatar-hd.jpg' }
    ];

    const handleAddStaff = () => {
        dispatch(
            modelActions.show({
                name: modelNames.ADD_ACADEMIC_STAFF
            })
        );
    };

    const handleRemoveStaff = (id: string) => {
        dispatch(
            modelActions.show({
                name: modelNames.REMOVE_ACADEMIC_STAFF,
                props: { id }
            })
        );
    };

    return (
        <div className="relative px-4 py-4 mb-4 bg-white rounded-lg">
            <div onClick={handleAddStaff} className="absolute right-4 top-4 cursor-pointer z-[+1]">
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

            <h1 className="text-xl font-semibold text-dark-green">Supporting Staff</h1>

            <ul className="mt-4">
                {staffMembers.map((staff) => (
                    <li
                        key={staff.id}
                        className="flex items-center justify-between gap-5 mb-1 text-sm">
                        <div className="flex flex-row items-center justify-center gap-4">
                            <img
                                src={staff.avatar}
                                alt={`${staff.name}'s Avatar`}
                                className="w-10 h-10 mb-2 rounded-full"
                            />
                            <div className="font-semibold text-md">{staff.name}</div>
                        </div>
                        <div
                            onClick={() => handleRemoveStaff(staff.id)}
                            className="w-5 h-5 text-lg cursor-pointer text-neutral-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="red"
                                className="size-5">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SupportingStaff;
