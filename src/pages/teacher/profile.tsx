import ProfileInfoCard from '@/components/cards/profile';
import ProfileDetailsCard from '@/components/cards/profile-details';
import SupportingStaffCard from '@/components/cards/supporting-staff-card';
import Heading from '@/components/headings/main';
import Table from '@/components/table';
import useRoleHandler from '@/hooks/role-handler';
import { IRootState } from '@/redux';
import { useDispatch, useSelector } from 'react-redux';
import InstitutionCard from '@/components/cards/profile-institute';
import classServices from '@/redux/services/class/class.service';
import useErrorHandler from '@/hooks/error-handler';
import { Skeleton } from '@nextui-org/react';

export default function Profile() {
    const dispatch = useDispatch();

    const { user } = useSelector((state: IRootState) => state.user);
    const teacherId = user?.userId?.toString();
    const instituteId = user?.instituteId;

    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const Biology = [
        { id: 1, type: 'Theory', year: 2021 },
        { id: 2, type: 'Theory', year: 2022 },
        { id: 3, type: 'Theory', year: 2023 },
        { id: 5, type: 'Revision', year: 2024 }
    ];
    const Chemistry = [
        { id: 1, type: 'Theory', year: 2023 },
        { id: 2, type: 'Revision', year: 2024 }
    ];

    const renderClass = ({ data }: CustomTableCellData) => {
        return (
            <div className="flex flex-col gap-1">
                <span className="font-semibold text-dark-green">{data.class.name}</span>
                <span>{data.class.institute}</span>
            </div>
        );
    };

    /* this is a sample data */
    const tableData = [
        {
            class: {
                name: 'Physics',
                institute: 'Roodel Institute - 2023'
            },
            students: '210'
        }
    ];

    //handle academic staff members popup
    const tableColumns: TableColumn[] = [
        { name: 'Class', value: { render: renderClass } },
        { name: 'Students', value: 'students' }
    ];

    const {
        data: instituteClasses,
        isLoading: classesLoading,
        isError: isClassesError,
        error: classesError
    } = classServices.useGetClassByTeacherAndInstituteGroupBySubjectQuery(
        {
            teacherId: parseInt(teacherId, 10),
            instituteId,
            search: searchParams.get('search') || '',
            page: searchParams.get('search') ? 1 : Number(searchParams.get('page')) || 1
        },
        {
            skip: !teacherId || !instituteId
        }
    );

    console.log('Institute Classes - ', instituteClasses);

    useErrorHandler(isClassesError, classesError);

    return (
        <div className="flex flex-col gap-3">
            <Heading>Profile</Heading>
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-lg:gap-0">
                <section className="w-full col-span-1 h-fit">
                    <ProfileInfoCard />
                    <ProfileDetailsCard />
                    <SupportingStaffCard />
                </section>

                <section className="w-full col-span-2 max-lg:pr-4">
                    <div className="relative px-6 py-4 mb-4 bg-white rounded-lg">
                        <h1 className="text-xl font-semibold text-dark-green">My Classess</h1>
                        <div className="flex flex-wrap justify-start mx-6 mb-4 mt-7">
                            <div>
                                {classesLoading ? (
                                    Array.from({ length: 1 }).map((_, index) => (
                                        <Skeleton key={index} className="h-32 rounded-lg mb-4" />
                                    ))
                                ) : instituteClasses?.data &&
                                  Object.keys(instituteClasses.data).length > 0 ? (
                                    Object.entries(instituteClasses.data).map(
                                        ([subjectName, classes]: [string, any[]]) => (
                                            <div key={subjectName} className="mb-6">
                                                <h2 className="mt-5 font-medium mb-8">
                                                    {subjectName}
                                                </h2>
                                                <div className="space-y-3">
                                                    {classes.map(
                                                        (classItem: any, index: number) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center justify-center w-24 p-4 mb-10 mr-8 rotate-45 border rounded-3xl aspect-square border-dark-green shadow-custom bg-slate-50">
                                                                <div className="flex flex-col items-center justify-center -rotate-45">
                                                                    <span className="text-sm">
                                                                        {classItem.className}{' '}
                                                                    </span>
                                                                    <span className="text-xs">
                                                                        {classItem.dayOfWeek}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="text-sm text-neutral-500">No Data Found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="relative px-6 py-4 mb-4 bg-white rounded-lg">
                        <h1 className="mb-4 text-xl font-semibold text-dark-green">
                            Educational Institute
                        </h1>

                        <InstitutionCard />
                    </div>
                    <div className="relative px-6 py-4 mb-4 bg-white rounded-lg">
                        <h1 className="mb-4 text-xl font-semibold text-dark-green">Students</h1>

                        <Table data={tableData} columns={tableColumns} />
                    </div>
                </section>
            </div>
        </div>
    );
}
