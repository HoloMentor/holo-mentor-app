import Content from '@/components/content';
import Heading from '@/components/headings/main';
import { Accordion, AccordionItem } from '@nextui-org/react';
// import { Link } from 'react-router-dom';

import useErrorHandler from '@/hooks/error-handler';
import { IRootState } from '@/redux';
// import teacherServices from '@/redux/services/teacher.service';
import studentServices from '@/redux/services/student.service';
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

    return (
        <div className="flex flex-col gap-3">
            <Heading>Subjects</Heading>

            <Content>
                <Accordion variant="splitted" selectionMode="multiple">
                    {Array.from({ length: 3 }).map((_, i) => {
                        return (
                            <AccordionItem
                                key={`teacher-${i}`}
                                aria-label={`Accordion ${i}`}
                                title={<span className="text-2xl font-semibold">Teacher {i}</span>}
                                className="!shadow-none border border-light-border rounded-lg p-4"
                                classNames={{
                                    content:
                                        'grid gap-4 grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1'
                                }}>
                                {Array.from({ length: 5 }).map((_, j) => {
                                    return (
                                        <Link
                                            title={'Subject Name'}
                                            key={`subject-${j}`}
                                            to={`/subjects/${j}`}
                                            className="text-black">
                                            <div className="relative w-full p-5 border rounded-md border-light-border">
                                                <span className="block font-semibold truncate max-w-52">
                                                    Physics
                                                </span>
                                                <img
                                                    src="/images/subjects/book.svg"
                                                    alt="Book"
                                                    className="absolute bottom-0 right-0 opacity-50"
                                                />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Content>
        </div>
    );
}
