import ProfileInfoCardId from '@/components/cards/profile-id';
import ProfileDetailsCardId from '@/components/cards/profile-details-id';
import Heading from '@/components/headings/main';
import Table from '@/components/table';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useErrorHandler from '@/hooks/error-handler';
import { useLocation } from 'react-router-dom';
import userServices from '@/redux/services/user.service';
import classServices from '@/redux/services/class.service';
import { IRootState } from '@/redux';
import { useSelector } from 'react-redux';

export default function teacherProfile() {
    const { user } = useSelector((state: IRootState) => state.user);

    const { teacherId } = useParams<{ teacherId: string }>();
    const userRole = 'teacher';

    const location = useLocation();
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const {
        data: teacherData,
        isError: isTeacherLoadingError,
        error: teacherLoadingError
    } = userServices.useGetQuery(
        {
            id: parseInt(teacherId)
        },
        {
            skip: !teacherId
        }
    );
    useErrorHandler(isTeacherLoadingError, teacherLoadingError);

    const renderClass = ({ data }: CustomTableCellData) => {
        return (
            <Link to={`/class/${data.id}/progress`}>
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-dark-green">{data.class.name}</span>
                    <span className=" text-dark-green">{data.class.subject}</span>
                </div>
            </Link>
        );
    };

    const {
        data: instituteClasses,
        isLoading: classesLoading,
        isError: isClassesError,
        error: classesError
    } = classServices.useGetClassByTeacherAndInstituteQuery(
        {
            teacherId: parseInt(teacherId),
            instituteId: user.instituteId,
            search: searchParams.get('search') || '',
            page: searchParams.get('search') ? 1 : searchParams.get('page') || 1
        },
        {
            skip: !teacherId
        }
    );

    useErrorHandler(isClassesError, classesError);

    console.log(instituteClasses);

    const tableColumns: TableColumn[] = [
        { name: 'Class', value: { render: renderClass } },
        { name: 'Students', value: 'students' }
    ];

    const tableData = instituteClasses?.data?.map((classItem: any) => ({
        class: {
            name: classItem.className,
            subject: classItem.subjectName
        },
        students: classItem.studentCount,
        id: classItem.id
    }));

    const items = [
        { key: '1', name: 'William Harpy' },
        { key: '2', name: 'Tony Reichert' },
        { key: '3', name: 'Zoey Lang' },
        { key: '4', name: 'Jane Fisher' }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Profile</Heading>

            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-lg:gap-0">
                <section className="w-full col-span-1 h-fit">
                    {teacherData && <ProfileInfoCardId user={teacherData.data} role={userRole} />}
                    {teacherData && <ProfileDetailsCardId user={teacherData.data} />}
                    <div className="relative px-4 py-4 mb-4 bg-white rounded-lg">
                        <h1 className="text-xl font-semibold text-dark-green">Supporting Staff</h1>

                        <ul className="mt-4">
                            {items.map((item) => (
                                <li
                                    key={item.key}
                                    className="flex items-center justify-between gap-5 mb-1 text-sm">
                                    <div className="flex flex-row items-center justify-center gap-4">
                                        <img
                                            src="/images/student/avatar-hd.jpg"
                                            alt="Avatar"
                                            className="w-10 h-10 mb-2 rounded-full"
                                        />
                                        <div className="font-semibold text-md">{item.name}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="w-full col-span-2 max-lg:pr-4">
                    <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                        <div className="flex items-center justify-between gap-5 mb-4">
                            <h1 className="mb-1 text-xl font-semibold text-dark-green">Classes</h1>
                        </div>
                        <Table
                            data={tableData}
                            columns={tableColumns}
                            loading={classesLoading}
                            pagination={{ enable: true, pages: instituteClasses?.pages }}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
