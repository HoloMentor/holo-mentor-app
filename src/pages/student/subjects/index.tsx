import Content from '@/components/content';
import Heading from '@/components/headings/main';
import { Accordion, AccordionItem, Skeleton } from '@nextui-org/react';
// import { Link } from 'react-router-dom';

import useErrorHandler from '@/hooks/error-handler';
import { IRootState } from '@/redux';
// import teacherServices from '@/redux/services/teacher.service';
import studentServices from '@/redux/services/student.service';
// import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

interface InstituteClass {
    subjectName: string;
    className: string;
    id: number;
    name: string;
    subject: string;
    institute: {
        logo: string;
    };
}

export default function Subjects() {
    const { user } = useSelector((state: IRootState) => state.user);

    const location = useLocation();
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const {
        data: studentClasses,
        isError: isStudentClassesError,
        error: studentClassesError,
        isLoading: isStudentClassesLoading
    } = studentServices.useGetStudentClassesQuery(
        {
            id: user.userId,
            page: searchParams.get('search') ? 1 : searchParams.get('page') || 1
        },
        {
            skip: !user.userId
        }
    );
    useErrorHandler(isStudentClassesError, studentClassesError);
    console.log(studentClasses);

    return isStudentClassesLoading ? (
        <div className="flex flex-col gap-3">
            <Heading>Subjects</Heading>
            <Content>
                <div className="grid justify-between grid-cols-1 gap-6 pr-4
                ">
                    {Array.from({ length: 3 }).map((_) => {
                        return (
                            <div className="w-full flex items-center gap-3 py-6">
                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Content>
        </div>
    ) : studentClasses?.data?.data.length === 0 ? (
        <div className="flex flex-col gap-3">
            <Heading>Subjects</Heading>

            <Content>
                <div className="flex flex-col gap-5 justify-center items-center h-full">
                    <img className="max-w-64" src="/images/empty.svg" alt="Void" />
                    <h3>No subjects are found yet.</h3>
                </div>
            </Content>
        </div>
    ) : (
        <div className="flex flex-col gap-3">
            <Heading>Subjects</Heading>

            <Content>
                <Accordion variant="splitted" selectionMode="multiple">
                    {studentClasses?.data?.data.map((teacher: any, i: number) => {
                        return (
                            <AccordionItem
                                key={`teacher-${i}`}
                                aria-label={`Accordion ${i}`}
                                title={
                                    <span className="text-2xl font-semibold">
                                        {teacher.teacherFirstName} {teacher.teacherLastName}
                                    </span>
                                }
                                className="!shadow-none border border-light-border rounded-lg p-4"
                                classNames={{
                                    content:
                                        'grid gap-4 grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1'
                                }}>
                                {teacher.classes.map(
                                    (instituteClass: InstituteClass) => {
                                        return (
                                            <Link
                                                title={instituteClass.name}
                                                key={`class-${instituteClass.id}`}
                                                to={`/subjects/${instituteClass.id}`}
                                                className="text-black">
                                                <div className="relative w-full p-5 border rounded-md border-light-border">
                                                    <span className="block font-semibold truncate max-w-52">
                                                        {instituteClass.className} - {instituteClass.subjectName}
                                                    </span>
                                                    <img
                                                        src="/images/subjects/book.svg"
                                                        alt="Book"
                                                        className="absolute bottom-0 right-0 opacity-50"
                                                    />
                                                </div>
                                            </Link>
                                        );
                                    }
                                )}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Content>
        </div>
    );
}
