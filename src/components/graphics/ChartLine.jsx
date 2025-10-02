import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartLine = ({ data, title }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                align: 'center',
                labels: {
                    padding: 20,
                    boxWidth: 10,
                    font: {
                        family: 'Inter',
                    }
                },
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 16,
                    family: 'Inter',
                },
                padding: {
                    top: 10,
                    bottom: 30,
                }
            },
            
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    if (!data || !data.datasets || data.datasets.length === 0) {
        return <div className="text-gray-500 text-center">Cargando gráfico de línea...</div>;
    }

    return (
        <div className="relative h-full w-4/5">
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartLine;
