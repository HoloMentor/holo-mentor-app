import Button from '@/components/button';
import Heading from '@/components/headings/main';
import Content from '@/components/content';
import SubHeading from '@/components/headings/sub';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { Button as CustomButton } from '@nextui-org/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux';
import { useParams } from 'react-router-dom';
import studentServices from '@/redux/services/student.service';
import useErrorHandler from '@/hooks/error-handler';
import studyPlanServices from '@/redux/services/study-plan/study-plan.service';
import { Spinner } from '@nextui-org/react';

export default function Submissions() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const url = window.location.pathname;
    const urlParts = url.split('/');

    const classId = parseInt(urlParts[2]);
    const studentId = parseInt(urlParts[4]);

    const { user } = useSelector((state: IRootState) => state.user);
    const { subjectId } = useParams<{ subjectId: string }>();

    const {
        data: studyPlans,
        isError: isStudyPlansError,
        error: studyPlansError,
        isLoading: isStudyPlansLoading
    } = studentServices.useGetStudyPlansQuery({
        studentId: studentId,
        classId: classId
    });

    useErrorHandler(isStudyPlansError, studyPlansError);

    const studyPlanId = studyPlans?.data?.[0]?.id;

    const {
        data: submissions,
        isError: isSubmissionsError,
        error: submissionsError,
        isLoading: isSubmissionsLoading
    } = studyPlanServices.useGetSubmittedTasksQuery({
        studentId: studentId,
        studyPlaneId: studyPlanId
    });

    useErrorHandler(isSubmissionsError, submissionsError);

    const noOfTasks = submissions?.data?.totalTasks;
    const submissionsInfo = submissions?.data?.submissions;

    if (isStudyPlansLoading || isSubmissionsLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    return (
        <div>
            <Heading>Students</Heading>
            <div className="flex gap-2 px-8 mt-4 bg-white rounded-md">
                <p
                    className="p-4 mx-1 font-medium cursor-pointer hover:border-b-4 hover:border-green-900 hover:scale-95 hover:bg-slate-50"
                    onClick={() => navigate(currentPath.replace('/submissions', '/profile'))}>
                    Details
                </p>
                <p className="p-4 mx-1 border-b-3 border-[#489F2D] font-medium cursor-pointer hover:border-b-4 hover:border-green-900 hover:scale-95 hover:bg-slate-50">
                    Submissions
                </p>
            </div>

            <Content className="mt-4">
                <SubHeading>Study Plans</SubHeading>

                <Accordion variant="splitted" selectionMode="multiple">
                    {Array.from({ length: noOfTasks }).map((_, i) => {
                        const noOfSubmissions = submissionsInfo[i]?.submissionData.length;
                        const taskDescription = submissionsInfo[i]?.taskDescription;
                        const taskDescriptionData = taskDescription[0]?.content[0]?.text;
                        const taskTitle = submissionsInfo[i]?.taskTitle;
                        const selectedTaskData = submissionsInfo[i]?.submissionData;

                        return (
                            <AccordionItem
                                key={submissionsInfo[i]?.submissionId}
                                aria-label={`Accordion ${i}`}
                                title={
                                    <div className="flex justify-between">
                                        <span className="text-xl font-semibold">{taskTitle}</span>
                                        <span className="text-sm text-slate-600w">
                                            {noOfSubmissions} PDFs submitted
                                        </span>
                                    </div>
                                }
                                className="!shadow-none border border-light-border rounded-lg p-4"
                                classNames={{
                                    content: 'flex flex-col gap-10'
                                }}>
                                <div className="flex flex-col items-center justify-center gap-5 min-h-52">
                                    <p className="flex flex-col items-center gap-1">
                                        <span className="text-medium">{taskDescriptionData}. </span>
                                    </p>
                                    <div className="flex items-center justify-center w-full gap-2 p-4 border-2 border-dashed">
                                        {Array.from({ length: noOfSubmissions }).map((_, j) => {
                                            const docName = selectedTaskData[j]?.name;
                                            const docUrl = selectedTaskData[j]?.url;

                                            return (
                                                <a
                                                    key={j}
                                                    href={docUrl}
                                                    download={docName || 'document.pdf'}
                                                    className="flex flex-col items-center gap-4 m-4 text-dark-gray">
                                                    <img
                                                        src={`/images/subjects/pdf.svg`}
                                                        alt="PDF Material"
                                                        className="size-20"
                                                    />
                                                    <span className="block text-sm">{docName}</span>
                                                    <CustomButton
                                                        color="default"
                                                        variant="bordered">
                                                        Download
                                                    </CustomButton>
                                                </a>
                                            );
                                        })}
                                    </div>
                                    {/* <textarea
                                        className="w-full mt-2 text-black rounded-md resize-none h-28 bg-slate-200 placeholder-top-left"
                                        placeholder="Give feedback"
                                    />
                                    <div className="flex justify-end w-full mt-2">
                                        <Button>Add feedback</Button>
                                    </div> */}
                                </div>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Content>
        </div>
    );
}
