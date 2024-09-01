import useErrorHandler from '@/hooks/error-handler';
import { IRootState } from '@/redux';
import teacherServices from '@/redux/services/teacher.service';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

interface InstituteClass {
    id: number;
    name: string;
    subject: string;
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
    } = teacherServices.useGetTeacherClassesQuery(
        {
            id: user.userInstituteId,
            page: searchParams.get('search') ? 1 : searchParams.get('page') || 1
        },
        {
            skip: !user.userInstituteId
        }
    );
    useErrorHandler(isTeacherClassesError, teacherClassesError);

    console.log(teacherClasses);

    return (
        <div className="grid justify-between grid-cols-4 gap-5 pr-4 m-3 max-xl:grid-cols-2 max-sm:grid-cols-1 max-xl:m-0">
            {/* {teacherClasses.map((instituteClass: InstituteClass, i: number) => {
                return (
                    <Link key={`class-${i}`} to={`/classes/${instituteClass.id}`}>
                        <Card className="py-4 cursor-pointer hover:scale-[.99] !transition-all">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <small className="text-default-500">{instituteClass.subject}</small>
                                <h4 className="font-bold text-large">{instituteClass.name}</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible items-center py-2">
                                <img
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src="/images/institute.png"
                                    width={270}
                                />
                            </CardBody>
                        </Card>
                    </Link>
                );
            })} */}
        </div>
    );
}
