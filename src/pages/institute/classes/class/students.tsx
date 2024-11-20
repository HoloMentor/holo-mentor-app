import Heading from '@/components/headings/main';
import Table from '@/components/table';
import Input from '@/components/input';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import Button from '@/components/button';
import { modelActions } from '@/redux/reducers/model.reducer';
import { modelNames } from '@/models';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useErrorHandler from '@/hooks/error-handler';
import studentServices from '@/redux/services/student.service';

function classStudent() {
    const dispatch = useDispatch();


    const location = useLocation();
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const url = window.location.pathname;
    const classId = url.split('/')[2];

    const {
        data: instituteStudents,
        isLoading: studentLoading,
        isError: isStudentError,
        error: studentError
    } = studentServices.useGetClassesStudentQuery(
        {
            id: classId,
            search: searchParams.get('search') || '',
            page: searchParams.get('search') ? 1 : searchParams.get('page') || 1
        },
        {
            skip: !classId
        }
    );
    useErrorHandler(isStudentError, studentError);

    const tableData = instituteStudents?.data?.data?.map((student: { id: string; firstName: string; lastName: string; email: string }) => ({
        id: student.id,
        name: `${student.firstName || ''} ${student.lastName || ''}`,
        email: student.email || 'N/A',
    })) || [];

    const tableColumns = [
        { name: 'ID', value: 'id' },
        { name: 'Name', value: 'name' },
        { name: 'Email', value: 'email' },
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Students</Heading>
            <section className="w-full col-span-2 max-lg:pr-4">
                <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                    <div className="flex items-center justify-between gap-5 mb-4">
                        <Input className="max-w-96 w-full" placeholder="Search" />
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    className="flex items-center gap-2"
                                    endContent={
                                        <span>
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
                                        </span>
                                    }>
                                    Add New Student
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    className="text-center text-black"
                                    key="one-student"
                                    onClick={() =>
                                        dispatch(
                                            modelActions.show({
                                                name: modelNames.ADD_STUDENT
                                            })
                                        )
                                    }>
                                    Add a Student
                                </DropdownItem>
                                <DropdownItem
                                    className="text-center text-black"
                                    key="upload-csv"
                                    onClick={() =>
                                        dispatch(
                                            modelActions.show({
                                                name: modelNames.ADD_STUDENTS
                                            })
                                        )
                                    }>
                                    Upload By CSV File
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    {studentLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <Table data={tableData} columns={tableColumns} />
                    )}
                </div>
            </section>
        </div>
    );
}

export default classStudent;
