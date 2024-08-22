import ProfileInfoCard from '@/components/cards/profile';
import ProfileDetailsCard from '@/components/cards/profile-details';
import Heading from '@/components/headings/main';
import Table from '@/components/table';
import useRoleHandler from '@/hooks/role-handler';
import { IRootState } from '@/redux';
import { useSelector } from 'react-redux';

export default function Profile() {
    const { user } = useSelector((state: IRootState) => state.user);
    const role = useRoleHandler();

    const renderClass = ({ data }: CustomTableCellData) => {
        return (
            <div className="flex flex-col gap-1">
                <span className="text-dark-green font-semibold text-left ml-20">
                    {data.class.name}
                </span>
                <span className="text-left ml-20">{data.class.institute}</span>
            </div>
        );
    };

    const renderTeacher = ({ data }: CustomTableCellData) => {
        return (
            <div className="flex flex-col gap-1">
                <span className="text-dark-green font-semibold">{data.teacher}</span>
            </div>
        );
    };

    const tableData = [
        {
            class: {
                name: 'Biology',
                institute: 'Theory - 2023'
            },
            students: '210',
            teacher: 'John Seed'
        },

        {
            class: {
                name: 'Chemistry',
                institute: 'Theory - 2023'
            },
            students: '210',
            teacher: 'Joshep Seed'
        },

        {
            class: {
                name: 'Physics',
                institute: 'Theory - 2023'
            },
            students: '210',
            teacher: 'Jacob Seed'
        }
    ];

    const tableColumns: TableColumn[] = [
        { name: 'Teacher', value: { render: renderTeacher } },
        { name: 'Class', value: { render: renderClass } },
        { name: 'Students', value: 'students' }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Profile</Heading>
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-lg:gap-0">
                <section className="w-full h-fit col-span-1">
                    <ProfileInfoCard />
                    <ProfileDetailsCard />
                </section>

                <section className="w-full col-span-2 max-lg:pr-4">
                    <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                        <h1 className="text-xl font-semibold text-dark-green mb-4">Classes</h1>
                        <Table data={tableData} columns={tableColumns} />
                    </div>
                </section>
            </div>
        </div>
    );
}
