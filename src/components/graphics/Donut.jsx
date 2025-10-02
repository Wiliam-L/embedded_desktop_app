import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({data, title}) => {
    if (!data){
        return <div className="text-gray-500 text-center">Cargando gráfico...</div>;
    }
    const options = {
        responsive: true,
        maintainAspectRatio: true, // Permite que el gráfico se adapte al contenedor
        plugins: {
            legend: {
                position: 'bottom',
                align: 'center',
                labels: {
                    padding: 10,
                    boxWidth: 10,
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
    };

    return(
        <div className="relative h-auto">
           <Doughnut data={data} options={options} /> 
        </div>
    )
};


export default DoughnutChart;