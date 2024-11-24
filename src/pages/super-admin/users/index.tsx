import Heading from '@/components/headings/main';
import SearchInput from '@/components/search';
import Table from '@/components/table';
import useErrorHandler from '@/hooks/error-handler';
import userServices from '@/redux/services/user.service';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { renderAccessStatus, renderMoreActions, renderUserName } from './columns';

export default function Users() {
    const dispatch = useDispatch();

    const location = useLocation();
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const {
        data: allUsers,
        isError: isAllUsersError,
        error: allUsersError,
        isLoading: allUsersLoading
    } = userServices.useAllQuery({
        search: searchParams.get('search') || '',
        page: searchParams.get('search') ? 1 : searchParams.get('page') || 1
    });
    useErrorHandler(isAllUsersError, allUsersError);

    const tableColumns: TableColumn[] = [
        { name: 'Name', value: { render: renderUserName } },
        { name: 'Email', value: 'email' },
        { name: 'Access', value: { render: renderAccessStatus } },
        { name: 'Actions', value: { render: renderMoreActions } }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Users</Heading>

            <div className="relative flex flex-col gap-7 px-4 py-6 mb-4 bg-white rounded-lg">
                <section className="flex items-center justify-between gap-5 pr-5">
                    <SearchInput className="max-w-[400px]" />
                </section>

                <Table
                    data={allUsers?.data?.data}
                    columns={tableColumns}
                    loading={allUsersLoading}
                    pagination={{ enable: true, pages: allUsers?.data?.pages }}
                />
            </div>
        </div>
    );
}
