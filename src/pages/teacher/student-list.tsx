import Heading from '@/components/headings/main';
import Table from '@/components/table';
import { Chip } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
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
        <Chip color="success">Reviewed</Chip>
    ) : (
        <Chip color="warning">Pending</Chip>
    );
};

export default function Quizes() {

    const navigate = useNavigate();

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
                name: 'Senura Nawamina Kalubovila'
            },

            tier: 'tier 1',
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
                name: 'Senura Nawamina Kalubovila'
            },

            tier: 'tier 1',
            gender: 'male',
            status: 'Pending'
        }
    ];

    const tableColumns: TableColumn[] = [
        { name: 'Name', value: { render: renderClass } },
        { name: 'Tier', value: 'tier' },
        { name: 'Gender', value: 'gender' },
        { name: 'Status', value: { render: renderStatus } }
    ];

    const handleRowClick =(rowData: any) => {
        navigate('/student/profile');
    }
    return (
        <>
            <Heading>Students</Heading>

            <div className="flex justify-end mr-4 ">
            <Input placeholder="Search" className='max-w-72'/>
            </div>
            <section className="mt-2">
                <Table data={tableData} columns={tableColumns} onRowClick={handleRowClick}/>
            </section>
        </>
    );
}
