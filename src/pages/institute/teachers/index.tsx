import Heading from '@/components/headings/main.tsx';
import Table from '@/components/table';
import Input from '@/components/input.tsx';
import Button from '@/components/button.tsx';
import { Link } from 'react-router-dom';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import { modelNames } from '@/models';
import { useDispatch, useSelector } from 'react-redux';
import { renderMoreActions } from './columns.tsx';
import { useLocation } from 'react-router-dom';
import { IRootState } from '@/redux';
import useErrorHandler from '@/hooks/error-handler.tsx';
import teacherServices from '@/redux/services/teacher.service.ts'

function Teachers() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const location = useLocation();
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());


    const renderTeacher = ({ data }: CustomTableCellData) => {
        return (
            <div className="flex flex-raw">
                <img
                    src={data.teacher.pnglink}
                    alt="avatar"
                    className="relative inline-block h-8 w-8 !rounded-full  object-cover object-center border-2 border-dark-green"
                />
                <Link to={`/teachers/${data.id}`}>
                    <span className="text-left ml-5 mt-2">{data.teacher.name}</span>
                </Link>
            </div>
        );
    };

    const {
        data: institueTeachers,
        isLoading : TeachersLoading,
        isError: isTeachersError,
        error : TeachersError
    } = teacherServices.useGetInstituteTeacherQuery(
        {
            teacherID : user.teacherID,
            search: searchParams.get('search') || '',
            page: searchParams.get('search') ? 1 : searchParams.get('page') || 1
        },
        {
            skip: !user.teacherID
        }
    );
    useErrorHandler(isTeachersError, TeachersError);

    const tableColumns: TableColumn[] = [
        { name: 'Teacher', value: { render: renderTeacher } },
        { name: 'No of Classes', value: 'classes' },
        { name: 'Subject', value: 'subject' },
        { name: 'Type', value: 'type' },
        { name: 'Actions',value: { render: renderMoreActions}}
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Teachers</Heading>
            <section className="w-full col-span-2 max-lg:pr-4">
                <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                    <div className="flex items-center justify-end gap-2 mb-4">
                        <Input className="max-w-96 w-full" placeholder="Search" />
                        <Button
                            onClick={() =>
                                dispatch(
                                    modelActions.show({
                                        name: modelNames.ADD_TEACHER
                                    })
                                )
                            }
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
                            Add New
                        </Button>
                    </div>
                    <Table
                        data={institueTeachers?.data?.data}
                        columns={tableColumns}
                        loading={TeachersLoading}
                        pagination={{ enable: true, pages: institueTeachers?.data?.pages }}
                    />
                </div>
            </section>
        </div>
    );
}

export default Teachers;
