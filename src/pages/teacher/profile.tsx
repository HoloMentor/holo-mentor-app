import ProfileInfoCard from '@/components/cards/profile';
import ProfileDetailsCard from '@/components/cards/profile-details';
import SupportingStaffCard from '@/components/cards/supporting-staff-card';
import Heading from '@/components/headings/main';
import Table from '@/components/table';
import useRoleHandler from '@/hooks/role-handler';
import { modelNames } from '@/models';
import { IRootState } from '@/redux';
import { modelActions } from '@/redux/reducers/model.reducer';
import { useDispatch, useSelector } from 'react-redux';
import InstitutionCard from '@/components/cards/profile-institute';

export default function Profile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);
    const role = useRoleHandler();

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
                        <div className="mt-5 ml-4 font-medium">Biology</div>
                        <div className="flex flex-wrap justify-start mx-6 mb-4 mt-7">
                            {Biology.map((tution) => (
                                <div
                                    key={tution.id}
                                    className="flex items-center justify-center w-24 p-4 mb-10 mr-8 rotate-45 border rounded-3xl aspect-square border-dark-green shadow-custom bg-slate-50">
                                    <div className="flex flex-col items-center justify-center -rotate-45">
                                        <span className="text-lg">{tution.type} </span>
                                        <span className="text-xs">{tution.year}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 ml-4 font-medium">Chemistry</div>
                        <div className="flex justify-start mx-6 mb-4 mt-7">
                            {Chemistry.map((tution) => (
                                <div
                                    key={tution.id}
                                    className="flex items-center justify-center w-24 p-4 mb-10 mr-8 rotate-45 border rounded-3xl aspect-square border-dark-green shadow-custom bg-slate-50">
                                    <div className="flex flex-col items-center justify-center -rotate-45">
                                        <span className="text-lg">{tution.type} </span>
                                        <span className="text-xs">{tution.year}</span>
                                    </div>
                                </div>
                            ))}
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
