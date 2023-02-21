import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Fieldset from '../components/Fieldset';

import Connection from '../components/main/Connection';
import Progress from '../components/main/Progress';
import Graph from '../components/main/Graph';
import Device from '../components/main/Device';
import FilterForm from '../components/main/FilterForm';
import ProtocolList from '../components/main/ProtocolList';
import ResultTable from '../components/main/ResultTable';

import { PCR_STATUS, PCR_START, PCR_STOP, test } from '../API';
import { BUTTON } from '../Styles';

const Main = () => {
    // initialize values

    // router
    const history = useHistory();

    // device info
    const [isConnected, setConnected] = useState(false);
    const [serialNumber, setSerialNumber] = useState('');

    // filter  
    const [filters, setFilters] = useState(['', '', '', '']);
    const [filterCts, setFilterCts] = useState(['', '', '', '']);
    const [filterNames, setFilterNames] = useState(['', '', '', '']);
    const [displayFilters, setDisplayFilters] = useState([true, true, true, true])

    // result 
    const [results, setResults] = useState(['', '', '', '']);
    const [resultCts, setResultCts] = useState(['', '', '', '']);

    // protocol 
    const [protocolName, setProtocolName] = useState('');
    const [protocols, setProtocols] = useState([]);
    const [magnetoProtocols, setMagnetoProtocols] = useState([]);

    // sensor value
    const [photodiodes, setPhotodiodes] = useState([[], [], [], []]);
    const [temperature, setTemperature] = useState(0);

    // pcr state
    const [state, setState] = useState('');
    const [running, setRunning] = useState(false);

    // remain sec
    const [remainSec, setRemainSec] = useState(0);
    const [remainingTotalSec, setRemainingTotalSec] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    // protocol lines
    const [remainingGotoCount, setRemainingGotoCount] = useState(0);
    const [totalActionNumber, setTotalActionNumber] = useState(0);
    const [currentActionNumber, setCurrentActionNumber] = useState(0);

    const displayHandler = event => {
        const targetIndex = event.target.id;
        setDisplayFilters(displayFilters.map((isShow, index) => index == targetIndex ? !isShow : isShow));
    }

    const toSetup = event => {
        if (running) {
            alert('pcr is running');
        } else {
            history.push('setup');
        }
    }

    const pcrStart = event => {
        fetch(!running ? PCR_START : PCR_STOP, { method: 'POST' })
            .then(response => response.json())
            .then(response => {
                // TODO : confirm if to run
            });
    }

    // update function 
    const updatePcrStatus = () => {
        fetch(PCR_STATUS, { method: 'POST' }) // fetch data from api
            .then(response => response.json()) // to json
            .then(response => { // update paramters
                setConnected(response.result);

                const status = response.data;
                setSerialNumber(status.serialNumber);

                // filter
                setFilters(status.filters);
                setFilterCts(status.filterCts);
                setFilterNames(status.filterNames);

                // result 
                setResults(status.result);
                setResultCts(status.resultCts);

                // protocol 
                setProtocolName(status.protocolName);
                setProtocols(status.protocols);
                setMagnetoProtocols(status.magnetoProtocols);
                // console.log(status.magnetoProtocols);

                setPhotodiodes(status.photodiodes);
                setTemperature(status.temperature);

                // pcr state
                setState(status.stateString);
                setRunning(status.running);

                // remain sec
                setRemainSec(status.remainSec);
                setRemainingTotalSec(status.remainingTotalSec);
                setElapsedTime(status.elapsedTime);

                // protocol lines
                setRemainingGotoCount(status.remainingGotoCount);
                setTotalActionNumber(status.totalActionNumber);
                setCurrentActionNumber(status.currentActionNumber);
            });
    };
    // state life cycle function 
    useEffect(() => {
        // component did mount
        const pcrStatusTimer = setInterval(updatePcrStatus, 500); // set update timeer (interval : 0.5s)
        // component will unmount
        return () => {
            clearInterval(pcrStatusTimer);  // clear update timer
        };

    }, []);

    return (
        <Container>
            <Row className="justify-content-center">
                {/* Connection */}
                <Col md='5'>
                    <Fieldset title='Connection'>
                        <Connection serialNumber={serialNumber} isConnected={isConnected} />
                    </Fieldset>
                </Col>
                {/* Progress */}
                <Col md='5'>
                    <Fieldset title='Progress'>
                        <Progress protocolName={protocolName} state={state} remainingTotalSec={remainingTotalSec} />
                    </Fieldset>
                </Col>
            </Row>
            {/* Graph */}
            <Row className="justify-content-center">
                <Col md='10' xs='10'>
                    {/* TODO : Plot Graph */}
                    <Graph photodiodes={photodiodes} displayFilters={displayFilters}/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {/* Device */}
                <Col md='4'>
                    <Fieldset title='Device'>
                        <Device temperature={temperature} />
                    </Fieldset>
                </Col>
                {/* CT Value */}
                <Col md={{ span: '5', offset: '1' }}>
                    <Fieldset title='CT Value'>
                        <Row className="justify-content-center">
                            {
                                filters.map(
                                    (filter, index) => {
                                        return <FilterForm key={index} isShow={displayFilters[index]}
                                            displayHandler={displayHandler}
                                            filter={filter} index={index} resultCt={resultCts[index]} />
                                    }
                                )
                            }
                        </Row>
                    </Fieldset>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md='4'>
                    {/* Protocol */}
                    <Fieldset title='Protocol'>
                        <Row className="justify-content-center">
                            <ProtocolList />
                        </Row>
                        <Row className="justify-content-center">
                            <Col as='button' md='8' xs='8' style={BUTTON} onClick={pcrStart}> {!running ? 'Start' : 'Stop'} </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col as='button' md='8' xs='8' style={BUTTON} onClick={toSetup} disabled={running}> Setup </Col>
                        </Row>
                    </Fieldset>
                </Col>
                <Col md={{ span: '5', offset: '1' }}>
                    {/* Result */}
                    <Fieldset title='Result'>
                        <Row className='justify-content-center'>
                            <ResultTable filterNames={filterNames} results={results}/>
                        </Row>
                    </Fieldset>
                </Col>
            </Row>
        </Container>
    );
}

export default Main;