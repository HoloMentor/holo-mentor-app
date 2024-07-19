import Heading from '@/components/headings/main';
import Table from '@/components/table';
import Select, { SelectValue } from '@/components/select';
import Input from '@/components/input';
import { useState } from 'react';

function Teachers() {
    const [filterValue, setFilterValue] = useState<SelectValue>('top');

    const renderTeacher = ({ data }: CustomTableCellData) => {
        return (
            <div className="flex flex-raw">
                <img
                    src={data.teacher.pnglink}
                    alt="avatar"
                    className="relative inline-block h-8 w-8 !rounded-full  object-cover object-center border-2 border-dark-green"
                />
                <span className='text-left ml-5 mt-2'>{data.teacher.name}</span>
            </div>
        );
    };

    const tableData = [
        {
            classes: '10',
            subject: 'Chemistry',
            teacher:{
                        pnglink : 'https://picsum.photos/400',
                        name:'Senaka Batagoda'
                    },
            type : 'A/L',
        },
        {
            classes: '10',
            subject: 'Physics',
            teacher:{
                pnglink : 'https://picsum.photos/400',
                name:'Senaka Batagoda'
            },
            type : 'A/L',
        },
        {
            classes: '10',
            subject: 'Maths',
            teacher:{
                pnglink : 'https://picsum.photos/400',
                name:'Senaka Batagoda'
            },
            type : 'O/L',
        },
        {
            classes: '10',
            subject: 'Science',
            teacher:{
                pnglink : 'https://picsum.photos/400',
                name:'Senaka Batagoda'
            },
            type : 'O/L',
        }
    ];

    const tableColumns: TableColumn[] = [
        { name: 'Teacher', value: {render:renderTeacher}},
        { name: 'No of Classes', value: 'classes' },
        { name: 'Subject', value: 'subject' },
        { name: 'Type', value: 'type'}
        
    ];

    const filterOptions = [
        {
            value: 'Type',
            label: 'Type'
        }
    ];
    

    return(
        <div className="flex flex-col gap-3">
            <Heading>Teachers</Heading>
            <section className="w-full col-span-2 max-lg:pr-4">
                    <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                        <div className="flex items-center justify-between gap-5 mb-4">
                            <Select className='max-w-36' options={filterOptions} value={filterValue} onChange={setFilterValue} />
                            <Input className='max-w-36' placeholder="Search" />
                        </div>
                        <Table data={tableData} columns={tableColumns} />
                    </div>
            </section>
        </div>


    )
}

export default Teachers;