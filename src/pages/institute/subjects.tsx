import Heading from '@/components/headings/main';
import Table from '@/components/table';
import Input from '@/components/input';
import Button from '@/components/button';
import Select, { SelectValue } from '@/components/select';
import { modelActions } from '@/redux/reducers/model.reducer';
import { modelNames } from '@/models';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Subjects() {
    const dispatch = useDispatch();
    const [filterValue, setFilterValue] = useState<SelectValue>('all');

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
        { name: 'Classes', value: 'classes' },
        { name: 'Students', value: 'students' }
    ];

    const filterOptions = [
        {
            value: 'all',
            label: 'All'
        }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Subjects</Heading>
            <section className="w-full col-span-2 max-lg:pr-4">
                <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                    <div className="flex items-center justify-between gap-5 mb-4">
                        <Select
                            className="max-w-36"
                            options={filterOptions}
                            value={filterValue}
                            onChange={setFilterValue}
                        />
                        <div className="flex flex-row gap-3">
                            <Input className="max-w-96 w-full" placeholder="Search" />
                            <Button
                                onClick={() =>
                                    dispatch(
                                        modelActions.show({
                                            name: modelNames.ADD_SUBJECTS
                                        })
                                    )
                                }>
                                Add Subject
                            </Button>
                        </div>
                    </div>
                    <Table data={tableData} columns={tableColumns} />
                </div>
            </section>
        </div>
    );
}
