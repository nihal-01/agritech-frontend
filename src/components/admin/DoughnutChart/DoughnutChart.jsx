import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({ chartData }) {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

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

    useEffect(() => {
        console.log('window');
        function handleResize() {
            setInnerWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                cutout: innerWidth / 10 - 55,
            }}
        />
    );
}

export default DoughnutChart;
