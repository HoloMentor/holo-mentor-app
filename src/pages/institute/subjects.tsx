import Heading from '@/components/headings/main';
import Table from '@/components/table';

export default function Subjects() {

    const tableData = [
        {
            
            subject: 'Biology',
            type: 'OL',
            students: '210',
            classes: '4'
        },

        {
            
            subject: 'Chemistry',
            type: 'AL',
            students: '210',
            classes: '3'
        },

        {
            
            subject: 'Physics',
            type: 'OL',
            students: '210',
            classes: '3'
        }
    ];

    const tableColumns: TableColumn[] = [
        { name: 'Subject', value: 'subject' },
        { name: 'AL/OL', value: 'type' },
        { name: 'Classes', value:"classes" },
        { name: 'Students', value: 'students' }
    ];


    return (
        <div className="flex flex-col gap-3">
            <Heading>Subjects</Heading>
            <section className="w-full col-span-2 max-lg:pr-4">
                    <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                        <Table data={tableData} columns={tableColumns} />
                    </div>
            </section>
        </div>
    );
        
}
