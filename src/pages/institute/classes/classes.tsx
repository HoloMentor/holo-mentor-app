import Table from '@/components/table';
import Heading from '@/components/headings/main';
import Input from '@/components/input';
import Button from '@/components/button';
import { modelActions } from '@/redux/reducers/model.reducer';
import { modelNames } from '@/models';
import { useDispatch, useSelector } from 'react-redux';
import { renderMoreActions } from '@/pages/institute/classes/columns.tsx';
import { IRootState } from '@/redux';
import { useLocation } from 'react-router-dom';
import classServices from '@/redux/services/class/class.service';
import useErrorHandler from '@/hooks/error-handler.tsx';

export default function Classes() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const location = useLocation();
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const {
        data: instituteClasses,
        isLoading: classesLoading,
        isError: isClassesError,
        error: classesError
    } = classServices.useGetInstituteClassesQuery(
        {
            instituteId: user.instituteId,
            search: searchParams.get('search') || '',
            page: searchParams.get('search') ? 1 : searchParams.get('page') || 1
        },
        {
            skip: !user.instituteId
        }
    );

    useErrorHandler(isClassesError, classesError);

    const tableColumns: TableColumn[] = [
        { name: 'Teacher', value: 'teacher' },
        { name: 'Subject', value: 'subject' },
        { name: 'Class', value: 'class' },
        { name: 'Students', value: 'students' },
        { name: 'Actions', value: { render: renderMoreActions } }
    ];

    const tableData = instituteClasses?.data?.data.map((classItem: any) => ({
        teacher: `${classItem.firstName} ${classItem.lastName}`,
        subject: classItem.subjectName,
        class: classItem.className,
        students: classItem.studentCount,
        id: classItem.id
    }));

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
                    <Table
                        data={tableData}
                        columns={tableColumns}
                        loading={classesLoading}
                        pagination={{ enable: true, pages: instituteClasses?.data?.pages }}
                    />
                </div>
            </section>
        </div>
    );
}
