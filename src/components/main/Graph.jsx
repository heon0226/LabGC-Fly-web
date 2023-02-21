import React, { Row, Col } from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

const GRAPH = {
    width: '100%',

}

export const LAYOUT_GRAPH = {
    showLegend: true,
    xaxis: {
        rangemode: 'tozero',
        title: "PCR Cycles",
        range: [0, 40]
    },
    yaxis: {
        rangemode: 'nonnegative',
        title: "Sensor Value",
        range: [0, 4096]
    }
};

const CONFIG = {
    responsive: false,
    displaylogo: true,
    scrollZoom: false,
    staticPlot: true,
    displayModeBar: false,
}

const FILTERS = ['FAM', 'HEX', 'ROX', 'CY5'];
const COLORS = ["#105f89", "#54ab48", "#80c13f", "#d92623"];


const Graph = props => {
    const drawGraphData = (photodiodes) => {

        const graphData = [];
        props.displayFilters.forEach(
            (isDisplay, index) => {
                if (isDisplay) {
                    graphData.push(
                        {
                            name: FILTERS[index],
                            x: photodiodes[index].length,
                            y: photodiodes[index],
                            type: 'line',
                            line: { color: COLORS[index] }
                        }
                    );
                }

            }
        );

        return graphData;
    }

    return (
        <Plot style={GRAPH} layout={LAYOUT_GRAPH} config={CONFIG} data={drawGraphData(props.photodiodes)} />
    );
}

export default Graph;