import Heading from '@/components/headings/main';
import Table from '@/components/table';
import { Chip } from '@nextui-org/react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Input from '@/components/input';

const renderClass = ({ data }: CustomTableCellData) => {
    return (
        <div className="p-1">
            <span>{data.class.image}</span>
            <span className="ml-4">{data.class.name}</span>
        </div>
    );
};

const renderStatus = ({ data }: CustomTableCellData) => {
    return data.status === 'Reviewed' ? (
        <Chip color="success" variant="bordered" className="w-24 max-w-xs text-center bg-success-5">
            Reviewed
        </Chip>
    ) : (
        <Chip
            color="warning"
            variant="bordered"
            className="w-24 max-w-xs text-center bg-warning-50">
            Pending
        </Chip>
    );
};

export default function Quizes() {
    const navigate = useNavigate();
    const location = useLocation();

    const tableData = [
        {
            class: {
                image: (
                    <img
                        src="https://picsum.photos/400"
                        alt="avatar"
                        className="relative inline-block h-10 w-10 !rounded-full  object-cover object-center border-4 border-dark-green"
                    />
                ),
                name: 'Giselle Biaggi'
            },

            tier: 'Tier 1',
            gender: 'male',
            status: 'Reviewed'
        },
        {
            class: {
                image: (
                    <img
                        src="https://picsum.photos/400"
                        alt="avatar"
                        className="relative inline-block h-10 w-10 !rounded-full  object-cover object-center border-4 border-dark-green"
                    />
                ),
                name: 'Lenee Mapham'
            },

            tier: 'Tier 1',
            gender: 'male',
            status: 'Pending'
        },
        {
            class: {
                image: (
                    <img
                        src="https://picsum.photos/401"
                        alt="avatar"
                        className="relative inline-block h-10 w-10 !rounded-full object-cover object-center border-4 border-dark-green"
                    />
                ),
                name: 'Tull Dullard'
            },
            tier: 'Tier 1',
            gender: 'male',
            status: 'Pending'
        },
        {
            class: {
                image: (
                    <img
                        src="https://picsum.photos/402"
                        alt="avatar"
                        className="relative inline-block h-10 w-10 !rounded-full object-cover object-center border-4 border-dark-green"
                    />
                ),
                name: 'Amara Wijesekera'
            },
            tier: 'Tier 2',
            gender: 'female',
            status: 'Reviewed'
        },
        {
            class: {
                image: (
                    <img
                        src="https://picsum.photos/403"
                        alt="avatar"
                        className="relative inline-block h-10 w-10 !rounded-full object-cover object-center border-4 border-dark-green"
                    />
                ),
                name: 'Kamal Perera'
            },
            tier: 'Tier 3',
            gender: 'male',
            status: 'Pending'
        },
        {
            class: {
                image: (
                    <img
                        src="https://picsum.photos/404"
                        alt="avatar"
                        className="relative inline-block h-10 w-10 !rounded-full object-cover object-center border-4 border-dark-green"
                    />
                ),
                name: 'Nimasha Fernando'
            },
            tier: 'Tier 1',
            gender: 'female',
            status: 'Reviewed'
        },
        {
            class: {
                image: (
                    <img
                        src="https://picsum.photos/405"
                        alt="avatar"
                        className="relative inline-block h-10 w-10 !rounded-full object-cover object-center border-4 border-dark-green"
                    />
                ),
                name: 'Ruwan Hettiarachchi'
            },
            tier: 'Tier 4',
            gender: 'male',
            status: 'Reviewed'
        }
    ];

    const tableColumns: TableColumn[] = [
        { name: 'Name', value: { render: renderClass } },
        { name: 'Tier', value: 'tier' },
        { name: 'Gender', value: 'gender' },
        { name: 'Status', value: { render: renderStatus } }
    ];

    const handleRowClick = (rowData: any) => {
        const currentpath = location.pathname;
        navigate(`${currentpath}/profile`);
    };
    return (
        <>
            <Heading>Students</Heading>

            <div className="flex justify-end mr-4 ">
                <Input placeholder="Search" className="max-w-72 bg-white" />
            </div>
            <section className="mt-2">
                <Table data={tableData} columns={tableColumns} onRowClick={handleRowClick} />
            </section>
        </>
    );
}
