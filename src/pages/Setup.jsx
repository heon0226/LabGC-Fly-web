import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, Router } from 'react-router-dom';

import Fieldset from '../components/Fieldset';

import ProtocolList from '../components/setup/ProtocolList';
import HistoryList from '../components/setup/HistoryList';

import { Row, Col, Container } from 'react-bootstrap';
import { PROTOCOL_LIST, HISTORY_LIST, PROTOCOL_DELETE } from '../API';
import { BUTTON } from '../Styles';


const Setup = () => {
    const history = useHistory();
    const [protocols, setProtocols] = useState([]);
    const [histories, setHistories] = useState([]);
    const [protocolIndex, setProtocolIndex] = useState(-1);
    // Call protocol list api
    const getProtocols = () => {
        fetch(PROTOCOL_LIST, { method: 'POST' })
            .then(response => response.json())
            .then(response => {
                if (response.result === 'ok') {
                    const tempProtocols = response.protocols;

                    tempProtocols.forEach(protocol => {
                        protocol.selected = false;
                    });

                    setProtocols(response.protocols);

                } else {
                    alert('You need to make the protocol first.');
                }
            });
    };

    // Call History list api
    const getHistories = () => {
        //TODO : Call history list api
        fetch(HISTORY_LIST, { method: 'POST' })
            .then(response => response.json())
            .then(response => {

                if (response.result === 'ok') {
                    const tempHistories = response.histories;

                    tempHistories.forEach(history => {

                        history.target = JSON.parse(history.target).filter(target => target);
                        history.filter = JSON.parse(history.filter).filter(filter => filter);
                        history.result = JSON.parse(history.result).filter(result => result);
                        history.ct = JSON.parse(history.ct).filter(ct => ct);

                    });
                    setHistories(tempHistories);
                }
            });
    };

    const protocolHandler = event => {
        const index = event.target.id;
        if (protocolIndex === -1) {
            protocols[index].selected = true;
            setProtocolIndex(index);
        }
        else if (protocolIndex === index) {
            protocols[protocolIndex].selected = false;
            setProtocolIndex(-1);
        } else {
            protocols[protocolIndex].selected = false;
            protocols[index].selected = true;
            setProtocolIndex(index);
        }
    };

    const creactProtocol = event => {
        history.push('editor/new');
    }

    const editProtocol = event => {
        if (protocolIndex === -1) {
            alert('You need to select the protocol first.');
        } else {
            history.push('editor/' + encodeURIComponent(protocols[protocolIndex].name));
        }
    }

    const delelteProtocol = event => {
        // TODO : Call delete protocol api 
        if (protocolIndex === -1) {
            alert('You need to select the protocol first.');
            return;
        }
        const protocolName = protocols[protocolIndex].name;
        const protocolID = protocols[protocolIndex].id;
        
        const result = window.confirm(`confirm to delete this protocol(${protocolName})`);

        if (result) {
            fetch(PROTOCOL_DELETE,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: protocolID.toString()
                }
            )
                .then(response => response.json())
                .then(response => {
                    alert(`complete to delete protocol(${protocolName})`);
                    getProtocols();
                })
        }
    }
    // 
    useEffect(() => {
        getProtocols();
        getHistories();
    }, [])

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md='9'>
                    <Fieldset title='Protocol Manager'>
                        <Row>
                            <Col md='8' xs='8'>
                                <ProtocolList protocols={protocols} handler={protocolHandler} />
                            </Col>
                            <Col md={{ span: '2', offset: '1' }} xs='auto'>
                                <Row className="justify-content-center">
                                    <Col as='button' style={BUTTON} onClick={creactProtocol}>Add</Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col as='button' style={BUTTON} onClick={editProtocol}>Edit</Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col as='button' style={BUTTON} onClick={delelteProtocol}>Delete</Col>
                                </Row>


                            </Col>
                        </Row>
                    </Fieldset>
                </Col>

            </Row>
            <Row className="justify-content-md-center">
                <Col md='9'>
                    <Fieldset title='History'>
                        <HistoryList histories={histories} />
                    </Fieldset>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
                <button style={BUTTON} onClick={() => history.replace('')}>Back</button>
            </Row>
        </Container>
    );

}
export default Setup;