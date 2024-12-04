import useErrorHandler from '@/hooks/error-handler';
import { IRootState } from '@/redux';
import classServices from '@/redux/services/class/class.service';
import teacherServices from '@/redux/services/teacher.service';
import { Card, Skeleton } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

interface InstituteClass {
    id: number;
    name: string;
    subject: {
        name: string;
    };
    className: string;
    institute: {
        logo: string;
    };
}

export default function Classes() {
    const { user } = useSelector((state: IRootState) => state.user);
    const location = useLocation();
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const {
        data: teacherClasses,
        isError: isTeacherClassesError,
        error: teacherClassesError,
        isLoading: isTeacherClassesLoading
    } = teacherServices.useGetInstituteTeacherClassesQuery(
        {
            id: user.userInstituteId,
            page: searchParams.get('search') ? 1 : searchParams.get('page') || 1
        },
        {
            skip: !user.userInstituteId
        }
    );
    useErrorHandler(isTeacherClassesError, teacherClassesError);

    return isTeacherClassesLoading ? (
        <div className="grid justify-between grid-cols-6 gap-5 pr-4 m-3 max-xl:grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xl:m-0">
            {Array.from({ length: 3 }).map((_, i: number) => {
                return (
                    <Card
                        key={`class-skeleton-${i}`}
                        className="w-full max-w-[200px] space-y-5 p-4 max-sm:max-w-full"
                        radius="lg">
                        <Skeleton className="rounded-lg">
                            <div className="h-32 rounded-lg bg-default-300 max-sm:h-60"></div>
                        </Skeleton>
                        <div className="space-y-1">
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="w-3/5 h-3 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="w-4/5 h-3 rounded-lg bg-default-200"></div>
                            </Skeleton>
                        </div>
                    </Card>
                );
            })}
        </div>
    ) : teacherClasses?.data?.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full gap-5">
            <img className="max-w-64" src="/images/empty.svg" alt="Void" />
            <h3>No classes are found yet.</h3>
        </div>
    ) : (
        <div className="grid justify-between grid-cols-6 gap-5 pr-4 m-3 max-xl:grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xl:m-0">
            {teacherClasses?.data?.data?.map((instituteClass: InstituteClass, i: number) => {
                return (
                    <Link key={`class-${instituteClass.id}`} to={`/classes/${instituteClass.id}`}>
                        <Card
                            key={`class-skeleton-${i}`}
                            className="w-full max-w-[200px] space-y-5 p-4 max-sm:max-w-full hover:scale-[.99] !transition-all shadow-sm"
                            radius="lg">
                            <div className="flex justify-center w-full h-32 rounded-lg max-sm:h-60">
                                <img
                                    alt="Card background"
                                    className="object-cover overflow-visible rounded-xl"
                                    src="/images/institute.png"
                                    width={100}
                                />
                            </div>
                            <div className="space-y-1">
                                <small className="text-default-500">
                                    {instituteClass.subject.name}
                                </small>
                                <h4 className="font-bold text-large">{instituteClass.className}</h4>
                            </div>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}
