import Heading from '@/components/headings/main';
import useErrorHandler from '@/hooks/error-handler';
import studyPlanTaskServices from '@/redux/services/study-plan/tasks.service';
import { Accordion, AccordionItem, Skeleton } from '@nextui-org/react';
import { useParams } from 'react-router-dom';

import TaskView from '@/pages/student/study-plan/task-view';

export default function StudyPlanIndividual() {
    const { subjectId, studyPlanId } = useParams();
    // let { classId } = useParams<{ classId: string }>();
    // const { subjectId } = useParams<{ subjectId: string }>();

    const classId = subjectId;

    // if subjectId is available and classId is not, set classId to subjectId
    // if (subjectId && !classId) classId = subjectId;

    const {
        data: studyPlanTasks,
        isError: isStudyPlanTasksError,
        error: studyPlanTasksError,
        isLoading: isStudyPlanTasksLoading
    } = studyPlanTaskServices.useGetTierStudyPlanTasksQuery(
        {
            classId,
            studyPlanId
        },
        {
            skip: !classId || !studyPlanId
        }
    );
    useErrorHandler(isStudyPlanTasksError, studyPlanTasksError);

    return (
        <div className="flex flex-col gap-3">
            <Heading>Study Plan Tasks</Heading>

            <div className="py-6 mb-4 bg-white rounded-md">
                <Accordion variant="splitted" selectionMode="multiple">
                    {isStudyPlanTasksLoading
                        ? Array.from({ length: 4 }).map((_, i) => {
                              return (
                                  <AccordionItem
                                      key={`task-${i}`}
                                      aria-label={`Accordion ${i}`}
                                      title={
                                          <div className="flex items-center gap-4">
                                              <Skeleton className="max-w-52 w-full h-7 rounded-md"></Skeleton>
                                          </div>
                                      }
                                      className="!shadow-none border border-light-border rounded-lg p-4 py-4"
                                      classNames={{
                                          content: 'flex flex-col gap-4'
                                      }}>
                                      <Skeleton className="max-w-[60%] w-full h-4 rounded-md"></Skeleton>
                                      <Skeleton className="max-w-[52%] w-full h-4 rounded-md"></Skeleton>
                                      <Skeleton className="max-w-[70%] w-full h-4 rounded-md"></Skeleton>
                                  </AccordionItem>
                              );
                          })
                        : studyPlanTasks?.data?.map(
                              (task: { id: number; title: string; description: any }) => (
                                  <AccordionItem
                                      key={`task-${task.id}`}
                                      aria-label={`Accordion ${task.id}`}
                                      title={
                                          <div className="flex items-center gap-4">
                                              <p className="text-xl font-semibold">{task.title}</p>
                                          </div>
                                      }
                                      className="!shadow-none border border-light-border rounded-lg p-4 py-4"
                                      classNames={{
                                          content: 'flex flex-col gap-4'
                                      }}>
                                      <TaskView
                                          task={task}
                                      />
                                  </AccordionItem>
                              )
                          )}
                </Accordion>
            </div>
        </div>
    );
}
