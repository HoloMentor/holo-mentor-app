import Heading from '@/components/headings/main';
import Table from '@/components/table';
import { Chip, Pagination } from '@nextui-org/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '@/components/input';
import studentServices from '@/redux/services/student.service';
import useErrorHandler from '@/hooks/error-handler';

const renderName = ({ data }: any) => (
    <div className="flex items-center p-1">
        <img
            src={data.image || '/images/User.svg'}
            alt="avatar"
            className="h-10 w-10 rounded-full object-cover object-center border-4 border-dark-green "
        />
        <span className="ml-4">
            {data.firstName} {data.lastName}
        </span>
    </div>
);

const renderTier = ({ data }: any) => <span>{data.tier ? `Tier ${data.tier}` : 'N/A'}</span>;

const Quizes = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const url = window.location.pathname;
    const classId = url.split('/')[2];

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const {
        data: instituteStudents,
        isLoading: studentLoading,
        isError: isStudentError,
        error: studentError
    } = studentServices.useGetAllClassesStudentQuery(
        {
            id: classId,
            search: searchParams.get('search') || '',
            page: currentPage
        },
        {
            skip: !classId
        }
    );

    useErrorHandler(isStudentError, studentError);

    console.log(instituteStudents);

    const handleRowClick = (rowData: any) => {
        const currentPath = location.pathname;
        navigate(`${currentPath}/${rowData.id}/submissions/`);
    };

    const handlePageChange = (page: number) => {
        searchParams.set('page', page.toString());
        navigate(`${location.pathname}?${searchParams.toString()}`);
    };

    const tableColumns = [
        { name: 'Name', value: { render: renderName } },
        { name: 'Tier', value: { render: renderTier } }
    ];

    const tableData = instituteStudents?.data?.data || [];
    const totalPages = instituteStudents?.data?.pages || 1;

    return (
        <>
            <Heading>Students</Heading>

            <div className="flex justify-end mr-4 ">
                <Input placeholder="Search" className="max-w-72 bg-white" />
            </div>

            <section className="mt-2 mx-5">
                <Table
                    data={tableData}
                    columns={tableColumns}
                    onRowClick={handleRowClick}
                    loading={studentLoading}
                />
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <Pagination
                            total={totalPages}
                            initialPage={currentPage}
                            onChange={handlePageChange}
                        />
                    </div>
                )}
            </section>
        </>
    );
};

export default Quizes;
