import Button from '@/components/button';
import Heading from '@/components/headings/main';
import SearchInput from '@/components/search';
import Table from '@/components/table';
import useErrorHandler from '@/hooks/error-handler';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';
import instituteServices from '@/redux/services/institute.service';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { renderInstituteName } from './columns';

export default function Institutes() {
    const dispatch = useDispatch();

    const location = useLocation();
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const {
        data: allInstitutes,
        isError: isAllInstitutesError,
        error: allInstitutesError,
        isLoading: allInstitutesLoading
    } = instituteServices.useAllQuery({
        search: searchParams.get('search') || '',
        page: searchParams.get('page') || 0
    });
    useErrorHandler(isAllInstitutesError, allInstitutesError);

    const tableColumns: TableColumn[] = [
        { name: 'Name', value: { render: renderInstituteName } },
        { name: 'City', value: 'city' },
        { name: 'Classes', value: 'id' },
        { name: 'No. of Students', value: 'id' },
        { name: 'No. of Teachers', value: 'id' }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Institutes</Heading>

            <div className="relative flex flex-col gap-7 px-4 py-6 mb-4 bg-white rounded-lg">
                <section className="flex items-center justify-between gap-5 pr-5">
                    <SearchInput className="max-w-[400px]" />

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

                <Table
                    data={allInstitutes?.data?.data}
                    columns={tableColumns}
                    loading={allInstitutesLoading}
                    pagination={{ enable: true, pages: allInstitutes?.data?.pages }}
                />
            </div>
        </div>
    );
}
