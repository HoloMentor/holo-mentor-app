import Heading from '@/components/headings/main.tsx';
import Table from '@/components/table';
import Button from '@/components/button.tsx';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import { modelNames } from '@/models';
import { useDispatch, useSelector } from 'react-redux';
import subjectServices from '@/redux/services/subject.service.ts';
import { useLocation } from 'react-router-dom';
import { IRootState } from '@/redux';
import useErrorHandler from '@/hooks/error-handler.tsx';
import SearchInput from '@/components/search.tsx';
import { renderMoreActions } from '@/pages/institute/subjects/columns.tsx';

export default function Index() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const location = useLocation();
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const {
        data: instituteSubjects,
        isLoading: subjectsLoading,
        isError: isSubjectsError,
        error: subjectsError
    } = subjectServices.useGetInstituteSubjectsQuery(
        {
            instituteId: user.instituteId,
            search: searchParams.get('search') || '',
            page: searchParams.get('search') ? 1 : searchParams.get('page') || 1
        },
        {
            skip: !user.instituteId
        }
    );
    useErrorHandler(isSubjectsError, subjectsError);

    const tableColumns: TableColumn[] = [
        { name: 'Subject', value: 'name' },
        { name: 'Classes', value: 'classCount' },
        { name: 'Students', value: 'studentCount' },
        { name: 'Actions', value: { render: renderMoreActions } }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Subjects</Heading>
            <section className="w-full col-span-2 max-lg:pr-4">
                <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                    <div className="flex items-center justify-between gap-5 mb-4">
                        <div className="flex justify-end gap-3 w-full">
                            <SearchInput className="max-w-96" />
                            <Button
                                onClick={() =>
                                    dispatch(
                                        modelActions.show({
                                            name: modelNames.ADD_SUBJECT
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
                    </div>
                    <Table
                        data={instituteSubjects?.data?.data}
                        columns={tableColumns}
                        loading={subjectsLoading}
                        pagination={{ enable: true, pages: instituteSubjects?.data?.pages }}
                    />
                </div>
            </section>
        </div>
    );
}
