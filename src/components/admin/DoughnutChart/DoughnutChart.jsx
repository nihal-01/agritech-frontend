import React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({ chartData }) {
    const data = {
        labels: chartData.map((dt) => {
            return dt._id;
        }),
        datasets: [
            {
                label: 'Orders',
                backgroundColor: [
                    '#49ba82',
                    '#3a82f6',
                    '#f97326',
                    '#0ca5e9',
                    '#f8cb3f',
                    '#f85c3f',
                ],
                data: chartData.map((dt) => {
                    return dt.ordersCount;
                }),
            },
        ],
    };
    return (
        <Doughnut
            data={data}
            options={{
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                maintainAspectRatio: false,
                cutout: 130,
            }}
        />
    );
}

export default DoughnutChart;
