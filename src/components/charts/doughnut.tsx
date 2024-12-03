import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useErrorHandler from '@/hooks/error-handler';
import { IRootState } from '@/redux';
import { useSelector } from 'react-redux';
import classServices from '@/redux/services/class/class.service';
import React from 'react';

Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(120, 120, 120)';
Chart.defaults.plugins.legend.position = 'bottom';
Chart.defaults.plugins.legend.title.display = true;

interface DoughnuChartProps {
    id: string;
}

function DoughnuChart({ id }: DoughnuChartProps) {
    //get class student data
    const { user } = useSelector((state: IRootState) => state.user);

    const instituteId = user.instituteId;
    const teacherId = id;

    const {
        data: StudentClassStats,
        isError: isStudentClassStatsError,
        error: StudentClassStatsError,
        isLoading: isStudentClassStatsLoading
    } = classServices.useGetClassStudentStatsQuery({
        instituteId: parseInt(instituteId, 10),
        teacherId: teacherId
    });

    useErrorHandler(isStudentClassStatsError, StudentClassStatsError);

    console.log('Student Class Stats - ', StudentClassStats);

    const chartData = React.useMemo(() => {
        if (StudentClassStats?.data) {
            const labels = StudentClassStats.data.map((item: any) => item.className);
            const values = StudentClassStats.data.map((item: any) => item.studentCount);

            const colors = labels.map(
                (_: string, index: number) =>
                    `hsl(140, 70%, ${(20 + (index * 10) / labels.length) % 30}%)`
            );

            return {
                labels,
                datasets: [
                    {
                        data: values,
                        backgroundColor: colors
                    }
                ]
            };
        }
        return null;
    }, [StudentClassStats]);

    const data = {
        labels: chartData?.labels,
        datasets: [
            {
                data: chartData?.datasets?.[0]?.data,
                backgroundColor: chartData?.datasets?.[0]?.backgroundColor,
                borderWidth: 2,
                radius: '70%'
            }
        ]
    };

    return (
        <div className="!w-full !h-full flex justify-center">
            <Doughnut data={data} />
        </div>
    );
}

export default DoughnuChart;
