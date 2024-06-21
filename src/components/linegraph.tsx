import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart ,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Linegraph() {

    const options = {};

    const data = {
        labels: ['1 Oct', '3 Oct', '7 Oct', '14 Oct', '20 Oct', '23 Oct', '17 Oct'],
        datasets: [
            {
                label: 'Chemistry',
                data: [65, 59, 80, 81, 56, 55],
                borderColor: '#FFA439',
                backgroundColor: '#FFA439',
            },
            {
                label: 'Physics',
                data: [28, 40, 40, 60, 52, 70, ],
                borderColor: '#489F2D',
                backgroundColor: '#489F2D',
            },
        ],
    };

    return <Line options={options} data={data}/>;
}
