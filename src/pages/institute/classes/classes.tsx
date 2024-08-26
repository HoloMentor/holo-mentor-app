import Table from '@/components/table';
import Heading from '@/components/headings/main';
import Input from '@/components/input';
import Button from '@/components/button';
import { modelActions } from '@/redux/reducers/model.reducer';
import { modelNames } from '@/models';
import { useDispatch } from 'react-redux';
import { renderMoreActions } from '@/pages/institute/classes/columns.tsx';

export default function Classes() {
    const dispatch = useDispatch();
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
        { name: 'Class', value: 'class' },
        { name: 'Students', value: 'students' },
        { name: 'Actions',value: { render: renderMoreActions}}
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Classes</Heading>
            <section className="w-full col-span-2 max-lg:pr-4">
                <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                    <div className="flex flex-row-reverse gap-3 mb-3">
                        <Button
                            onClick={() =>
                                dispatch(
                                    modelActions.show({
                                        name: modelNames.ADD_CLASS
                                    })
                                )
                            }>
                            Add New
                        </Button>
                        <Input className="max-w-96 w-full" placeholder="Search" />
                    </div>
                    <Table data={tableData} columns={tableColumns} />
                </div>
            </section>
        </div>
    );
}
