import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(120, 120, 120)';
Chart.defaults.plugins.legend.position = 'bottom';
Chart.defaults.plugins.legend.title.display = true;

const data = {
    labels: [
        'Sasip-Theory 2023',
        'Sasip-Theory 2024',
        'Sasip-Revision 2024',
        'Syzygy-Revision 2024'
    ],
    datasets: [
        {
            data: [400, 300, 250, 500],
            backgroundColor: [
                'rgb(25, 69, 69)',
                'rgb(0, 164, 124)',
                'rgb(45, 143, 143)',
                'rgb(96, 148, 144)'
            ],
            borderWidth: 2,
            radius: '70%'
        }
    ]
};

function DoughnuChart() {
    return (
        <div className="!w-full !h-full flex justify-center">
            <Doughnut data={data} />
        </div>
    );
}

export default DoughnuChart;
