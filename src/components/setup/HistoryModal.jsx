import React, { useState, useEffect } from 'react';

import { Modal, Row, Col, Container } from 'react-bootstrap';
// import Plot from 'react-plotly.js';

import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

import { HISTORY_TEMPDATA, HISTORY_GRAPHDATA } from '../../API';
import { LAYOUT_GRAPH, LAYOUT_TEMP, HISTORY_PLOT, PLOT } from '../../Styles';

const Plot = createPlotlyComponent(Plotly);

const CONFIG = {
    responsive: false,
    displaylogo: true,
    scrollZoom: false,
    staticPlot: true,
    displayModeBar: false,
}

const HistoryModal = props => {

    const [tempData, setTempData] = useState([]);
    const [graphData, setGraphData] = useState([]);

    const drawTempData = (data) => {
        const xData = [];
        const yData = [];

        data.forEach(item => {
            const tempItem = item.split('\t');
            xData.push(tempItem[0]);
            yData.push(tempItem[1]);
        })
        return {
            name: "temparture",
            x: xData,
            y: yData,
            type: "line",
            line: { color: "#45B5C6" }
        }
    }


    const drawGraphData = (data) => {
        const filters = ["FAM", "HEX", "ROX", "CY5"];
        const colors = ["#105f89", "#54ab48", "#80c13f", "#d92623"];

        data = filters.map((filter, index) => {
            return {
                name: filter,
                x: data[index].length,
                y: data[index],
                type: 'line',
                line: { color: colors[index] }
            }
        });
        return data;
    };


    const getTempDataList = () => {
        if (props.history.id === -1) {
            return;
        }
        fetch(HISTORY_TEMPDATA,
            {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: props.history.id.toString()
            })
            .then(response => response.json())
            .then(response => JSON.parse(response.tempData))
            .then(data => drawTempData(data))
            .then(data => setTempData(data));
    };

    const getGraphDataList = () => {
        if (props.history.id === -1) {
            return;
        }
        fetch(HISTORY_GRAPHDATA,
            {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: props.history.id.toString()
            })
            .then(response => response.json())
            .then(response => JSON.parse(response.graphData))
            .then(data => drawGraphData(data))
            .then(data => setGraphData(data));
    };




    useEffect(() => {
        getTempDataList();
        getGraphDataList();
    }, [props.show]);


    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            size='xl' {...props}>
            <Modal.Header>
                {props.history.date}
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className='justify-content-center'>
                        <Col md='10' sm='12' style={HISTORY_PLOT}>
                            <Plot style={PLOT} data={graphData} layout={LAYOUT_GRAPH} config={CONFIG} />
                        </Col>

                        <Col md='10' sm='12' style={HISTORY_PLOT}>
                            <Plot style={PLOT} data={tempData} layout={LAYOUT_TEMP} config={CONFIG} />
                        </Col>

                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide}>Close</button>
            </Modal.Footer>

        </Modal>
    );
}

export default HistoryModal;