import React from 'react';
import {Line} from 'react-chartjs-2';


function Chart(props){
    
    const options = {
        animation: {
            duration: 1700
        },
        legend: {
            display: false,
            position: props.legendPosition
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: "x-axis",
            backgroundColor: "#8290b5",
            titleFontSize: 13,
            bodyFontSize: 14
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: false
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 4,
                    backdropColor: "rgba(255,0,0,0.5)"
                }
            }]
        },
        showXLabels: 3
    }

    return (
            <Line 
                width = {450}
                height = {350}
                data={props.chartData}
                options = {options}
            />
    )
}

export default Chart;
