import {
    Chart as ChartJS,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

ChartJS.defaults.font.family = 'Poppins';

const options = {
    responsive: true,
    elements: {
        point: {
            radius: 0,
            hitRadius: 10
        }
    },
    plugins: {
        title: {
            display: false,
            text: 'Student Performance'
        },
        legend: {
            display: false
        }
    },
    interaction: {
        intersect: false
    },
    scales: {
        x: {
            display: true,
            title: {
                display: false
            },
            grid: {
                display: false
            }
        },
        y: {
            display: true,
            title: {
                display: false,
                text: 'Value'
            },
            grid: {
                display: false
            },
            suggestedMin: 0,
            suggestedMax: 200
        }
    }
};

const datapoints = [50, 20, 100, 80, 200, 40, 80];
// const DATA_COUNT = datapoints.length;
// const labels = Array.from({ length: DATA_COUNT }, (_, i) => i.toString());
const labels = ['10:30 AM', '11:30 AM', '12:30 PM', '1:30 PM', '2:30 PM', '3:30 PM', '4:30 PM'];

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Student Performance',
            data: datapoints,
            borderColor: '#489F2D',
            // fill: linear-gradient(180deg, #F3F0FF -13.53%, rgba(241, 237, 255, 0.00) 98.07%);
            backgroundColor: '#F3F0FF',
            fill: -1,
            tension: 0.4
        }
    ]
};

const LineChart = () => <Line options={options} data={data} />;

export default LineChart;
