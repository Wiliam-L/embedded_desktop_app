import React, { useState, useEffect } from 'react';
import { LuArrowDown, LuArrowUp, LuClipboardCheck } from "react-icons/lu";
import Header from '../../components/common/Header';
import { getSummary, getCollectedAmountMonthly, getTopFinesForAgent, getTopFinesForUbications } from '../../api/api';
import {Card} from '../../components/card/Card';
import DoughnutChart from '../../components/graphics/donut';
import ChartLine from '../../components/graphics/ChartLine';
import {Select} from '../../components/Select';

const Dashboard = () => {
    const [summaryData, setSummaryData] = useState({});
    const [monthlyPaymentProgress, setMonthlyPaymentProgress] = useState([]);
    const [topAgentInfraction, setTopAgentInfraction] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mapeo de números de mes a nombres
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [summary, monthly, top_agents] = await Promise.all([
                    getSummary(),
                    getCollectedAmountMonthly(),
                    getTopFinesForAgent()
                ]);
                setSummaryData(summary);
                setMonthlyPaymentProgress(monthly);
                setTopAgentInfraction(top_agents)

            } catch (err) {
                setError("Error al cargar los datos del resumen.");
                console.error("Failed to fetch data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (isLoading) {
        return <div className="p-6 text-center text-gray-500">Cargando datos...</div>;
    }
    if (error) {
        return <div className="p-6 text-center text-red-500">{error}</div>;
    }

    // Datos para el gráfico de Dona
    const finesDataChartDonut = {
        labels: ['Pagadas', 'Pendientes'],
        datasets: [
            {
                data: [summaryData.paidFinesThisMonth, summaryData.pendingFinesThisMonth],
                backgroundColor: ['#4CAF50', '#E0E0E0'],
                borderColor: ['#4CAF50', '#E0E0E0'],
                borderWidth: 1,
            }
        ]
    };

    // Datos para el gráfico de Línea (Recaudación Mensual)
    // Se procesan los datos de la API para obtener un formato usable
    const lineChartData = {
        labels: monthlyPaymentProgress.map(item => `${monthNames[parseInt(item.month) - 1]} ${item.year}`),
        datasets: [
            {
                label: 'Recaudación de Multas',
                data: monthlyPaymentProgress.map(item => parseFloat(item.totalAmount)),
                borderColor: '#3DAEDA', // Un color azul similar al de la imagen
                backgroundColor: '#3DAEDA', // Color con transparencia
                tension: 0.6,
                pointBackgroundColor: '#3DAEDA',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#2980b9'
            },
        ],
    };

    const professionalColors = [
        '#E67E22', // Naranja
        '#bedde6', // Verde azulado suave
        '#abc3d3', // Azul-gris medio
        '#576675', // Azul-gris oscuro
        '#1ABC9C', // Verde Marino
    ];

   
    const topInfractionAgentData = {
        labels: topAgentInfraction.map(item => `${item.agent}`),
        datasets: [
            {
                data: topAgentInfraction.map(item => item.fineCount),
                //según el tamaño de la lista asignar un color diferente 
                // agregar 5 colores para la gráfica de donut que sea profesional
                backgroundColor: professionalColors,
                borderColor: professionalColors,
                borderWidth: 1,
                
            }
        ]
    }

    return (
        <>
            <Header title="Dashboard" />
            <div className='p-4'>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Card
                        title="Resumen de Multas"
                        value={null}
                        subText="datos históricos hasta la fecha"
                        items={[
                            { label: "Multas totales", value: summaryData.totalFines },
                            { label: "Multas pendientes", value: summaryData.pendingFines },
                            { label: "Total recaudado", value: `Q${summaryData.totalCollected}` }
                        ]}
                        icon={<LuClipboardCheck size={24} />}
                        color="#10B981"
                    />
                    <Card
                        title="Multas pendientes"
                        value={summaryData.pendingFines}
                        subText={`Representa el ${summaryData.pendingPercentage}% del total`}
                        icon={<LuArrowDown size={24} />}
                        color="#EF4444"
                        color_value='#EF4444'
                    />
                    <Card
                        title="Multas pagadas este mes"
                        value={`${summaryData.paidFinesThisMonth}`}
                        subText={`Representa ${summaryData.paidPercentageThisMonth} del mes actual%`}
                        icon={<LuArrowUp size={24} />}
                        color="#F59E0B"
                        color_value="#F59E0B"
                    />
                </section>
                <section className="bg-white rounded-lg shadow-sm p-4 mb-4 h-80 flex items-center justify-center">
                    <div className='p-4 h-72 flex items-center justify-center'>
                        <DoughnutChart data={finesDataChartDonut} title="Progreso de Pagos Mensuales" />
                    </div>
                </section>
                <section className="flex flex-col gap-4 mb-4">
                    
                    <div className='bg-white rounded-lg p-4 h-100 flex flex-col'>
                    <div className='flex flex-col w-40'>
                            <Select title="filtrar por rango" options={[]} onChange={() => {}} key_name="" />
            
                        </div>
                        <div className='h-full flex items-center justify-center'>
                            <ChartLine data={lineChartData} fineCounts={monthlyPaymentProgress.map(item => parseInt(item.fineCount))} title="Recaudación Mensual de Multas" />
                        </div>
                    </div>
                </section>
                <section className='flex flex-row bg-white rounded-lg gap-20 p-4 items-center justify-center'>
                    <div className='flex flex-col bg-white w-1/3 flex items-center justify-center'>
                        <div className='pb-4 flex flex-col w-40'>
                            <select className='border border-gray-300 p-2 rounded-lg' defaultValue={-1} aria-placeholder='Seleccionar año'>
                                <option value="1">2025</option>
                                <option value="2">2024</option>
                            </select>
                        
                        </div>
                        <DoughnutChart data={topInfractionAgentData} title="Top 5 Agentes con más multas" />

                    </div>
                    
                    <div className='flex flex-col bg-white w-1/3 flex items-center justify-center'>
                        <div className='pb-4 flex flex-col w-40'>
                            <select className='border border-gray-300 p-2 rounded-lg' defaultValue={-1} aria-placeholder='Seleccionar año'>
                                <option value="1">2025</option>
                                <option value="2">2024</option>
                            </select>
                        
                        </div>
                        <DoughnutChart data={topInfractionAgentData} title="Top 5 Agentes con más multas" />
                    </div>
                </section>
            </div>
        </>
    );
};

export default Dashboard;