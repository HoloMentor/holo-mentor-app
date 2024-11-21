import { Skeleton } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/redux';
import staffServices from '@/redux/services/staff.service';
import useErrorHandler from '@/hooks/error-handler';
import { modelActions } from '@/redux/reducers/model.reducer';
import { modelNames } from '@/models';
import { useState } from 'react';

export default function SupportingStaffCard() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const [page, setPage] = useState(1);
    const limit = 5;

    // Fetch supporting staff
    const {
        data: staffData,
        isError: isStaffError,
        error: staffError,
        isLoading: isStaffLoading
    } = staffServices.useGetInstituteTeacherStaffQuery(
        {
            teacherId: user?.userId,
            instituteId: user?.instituteId,
            page,
            limit
        },
        {
            skip: !user?.userId || !user?.instituteId
        }
    );

    useErrorHandler(isStaffError, staffError);

    // console.log('teacherId:', user?.userId);
    // console.log('instituteId:', user?.instituteId);
    console.log('staffData:', staffData);

    const staffList = staffData?.data?.data || [];
    const totalStaffCount = staffList.length || 0;

    // Handle add staff
    const handleAddStaff = () => {
        dispatch(
            modelActions.show({
                name: modelNames.ADD_ACADEMIC_STAFF
            })
        );
    };

    // Handle remove staff
    const handleRemoveStaff = (id: string) => {
        dispatch(
            modelActions.show({
                name: modelNames.REMOVE_ACADEMIC_STAFF,
                props: { id }
            })
        );
    };

    // Handle pagination
    const handleNextPage = () => {
        if (staffList.length === limit) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    return (
        <div className="relative px-4 py-4 mb-4 bg-white rounded-lg">
            <div className="mb-6">
                <div
                    onClick={handleAddStaff}
                    className="absolute right-4 top-4 cursor-pointer z-[+1] hover:rounded-full hover:bg-[#F1F1F1]">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z"
                            fill="#6A6A6A"
                        />
                    </svg>
                </div>
                <h1 className="text-xl font-semibold text-dark-green">Supporting Staff</h1>
            </div>
            <ul className="mt-4">
                {isStaffLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="h-12 rounded-lg mb-4" />
                    ))
                ) : staffList.length > 0 ? (
                    staffList
                        .filter(
                            (staff: any) => staff.isDeleted === false || staff.isDeleted === null
                        )
                        .map((staff: any) => (
                            <li
                                key={staff.id}
                                className="flex items-center justify-between gap-4 mb-1 text-sm mx-2 my-4">
                                <div className="flex flex-row items-center justify-center gap-5">
                                    {staff.image ? (
                                        <img
                                            src={staff.image}
                                            alt={`${staff.firstName} ${staff.lastName}`}
                                            className="w-10 h-10 mb-2 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 p-2 rounded-full flex items-center justify-center bg-light-gray">
                                            <span className="text-lg font-bold text-neutral-400 rounded-full">
                                                {staff.firstName[0]}
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="font-semibold text-md">
                                            {staff.firstName} {staff.lastName}
                                        </h2>
                                        <p className="text-xs text-neutral-500">Supporting Staff</p>
                                    </div>
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
                        ))
                ) : (
                    <p className="text-sm text-neutral-500">No supporting staff members found.</p>
                )}
            </ul>
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="px-2 py-2 rounded-full cursor-pointer">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="Iconly/Light/Arrow - Left 3">
                            <g id="Arrow - Left 2">
                                <path
                                    id="Stroke 1"
                                    d="M9 2.83333L4.91667 6.91667L9 11"
                                    stroke="#BEBEBE"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </g>
                        </g>
                    </svg>
                </button>
                <span className="text-xs text-dark-gray">
                    Page {page} of {Math.ceil(totalStaffCount / limit)}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={staffList.length < limit}
                    className="px-2 py-2 rounded-full cursor-pointer">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="Iconly/Light/Arrow - Left 3">
                            <g id="Arrow - Left 2">
                                <path
                                    id="Stroke 1"
                                    d="M5 2.83333L9.08333 6.91667L5 11"
                                    stroke="#BEBEBE"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    );
}
