import { useContext } from 'react'
import { Line } from 'react-chartjs-2'
import AppContext from '../context/AppContext'
import "chartjs-adapter-date-fns"

const PriceChart = () => {

    const { state } = useContext(AppContext)

    const data = {
        labels: state.chart.times,
        datasets: [
            {
                data: state.chart.prices,
                fill: true,
                borderColor: state.chart.color,
                backgroundColor: state.chart.color === 'red' ? 'rgba(255,0,0,.25)' : 'rgba(0,255,0,.25)',
                tension: 0.3
            },
        ],
    }

    const options = {
        layout: {
            padding: 0
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: { 
            legend: { 
                display: false
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        var label = context.dataset.label || ''

                        if (label) {
                            label += ': '
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y)
                        }
                        return label
                    },
                    labelTextColor: function (context) {
                        return '#FFF'
                    }
                },
                titleFont: {
                    size: 12
                },
                bodyFont: {
                    size: 14
                }
            }
        },
        scales: {
            y: {
                position: 'right',
                beginAtZero: false,
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                },
            },
            x: {
                type: 'time',
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                },
            }
        },
        elements: {
            point: {
                radius: 1
            }
        },
        animation: {
            duration: 0
        }
    }
    return (
        <Line data={data} options={options} />
    )
}

export default PriceChart