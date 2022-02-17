import React from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function BarChart({ chartData }) {
    const data = {
        labels: chartData.map((dt) => {
            return dt._id;
        }),
        datasets: [
            {
                label: 'Amount',
                backgroundColor: [
                    '#49ba82',
                    '#3a82f6',
                ],
                data: chartData.map((dt) => {
                    return dt.total;
                }),
            },
        ],
    };

    console.log(chartData);
    return (
        <Bar
            data={data}
            options={{
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                maintainAspectRatio: false,
            }}
        />
    );
}

export default BarChart;
