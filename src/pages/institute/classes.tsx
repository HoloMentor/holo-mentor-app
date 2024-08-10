import Table from '@/components/table';
import Heading from '@/components/headings/main';

export default function Classes() {
    
    const tableData = [
        {
            
            subject: 'Biology',
            class: 'Theory - 2023',
            students: '210',
            teacher: 'John Seed'
        },

        {
            
            subject: 'Chemistry',
            class: 'Theory - 2023',
            students: '210',
            teacher: 'Joshep Seed'
        },

        {
            
            subject: 'Physics',
            class: 'Theory - 2023',
            students: '210',
            teacher: 'Jacob Seed'
        }
    ];

    const tableColumns: TableColumn[] = [
        { name: 'Teacher', value: 'teacher' },
        { name: 'Subject', value: 'subject' },
        { name: 'Class', value:"class" },
        { name: 'Students', value: 'students' }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Classes</Heading>
            <section className="w-full col-span-2 max-lg:pr-4">
                    <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                        <Table data={tableData} columns={tableColumns} />
                    </div>
            </section>
        </div>
    );
        
}
