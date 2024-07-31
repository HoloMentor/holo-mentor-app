import Button from '@/components/button';
import Heading from '@/components/headings/main';
import Input from '@/components/input';
import { renderInstituteName } from './columns';
import Table from '@/components/table';
import { useDispatch } from 'react-redux';
import { modelActions } from '@/redux/reducers/model.reducer';
import { modelNames } from '@/models';

export default function Institutes() {
    const dispatch = useDispatch();

    /* this is a sample data */
    const tableData = [
        {
            name: 'Roodel',
            image: 'https://picsum.photos/400',
            city: 'Colombo',
            classes: 400,
            teachers: 400,
            students: '2100'
        }
    ];

    const tableColumns: TableColumn[] = [
        { name: 'Name', value: { render: renderInstituteName } },
        { name: 'City', value: 'city' },
        { name: 'Classes', value: 'classes' },
        { name: 'No. of Students', value: 'students' },
        { name: 'No. of Teachers', value: 'teachers' }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Institutes</Heading>

            <div className="relative flex flex-col gap-7 px-4 py-6 mb-4 bg-white rounded-lg">
                <section className="flex items-center justify-between gap-5 pr-5">
                    <Input
                        startContent={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6">
                                <path
                                    fillRule="evenodd"
                                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                        placeholder="Search"
                        className="max-w-[400px]"
                    />

                    <Button
                        onClick={() =>
                            dispatch(
                                modelActions.show({
                                    name: modelNames.ADD_INSTITUTE
                                })
                            )
                        }
                        endContent={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6">
                                <path
                                    fillRule="evenodd"
                                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }>
                        Add New
                    </Button>
                </section>

                <Table data={tableData} columns={tableColumns} />
            </div>
        </div>
    );
}
