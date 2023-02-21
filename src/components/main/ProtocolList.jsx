import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { PROTOCOL_LIST, PROTOCOL_SELECT } from '../../API';

const SELECT = {
    margin: '10px auto',
    fontFamily: 'Consolas, sans-serif',
}

const OPTION = {
    fontFamily: 'Consolas, sans-serif',
}

const ProtocolList = props => {

    const [protocols, setProtocols] = useState([]); //protocol list state


    // get Protocol List (Call protocol list API)
    const getProtocols = () => {
        fetch(PROTOCOL_LIST, { method: 'POST' })
            .then(response => response.json())
            .then(response => {
                const result = response.result;
                setProtocols(response.protocols);
                if (response.protocols.length === 1) {
                    selectProtocol(response.protocols[0].id);
                }
            });
    };

    // TODO : select api 호출
    const selectProtocol = id => {
        fetch(PROTOCOL_SELECT,
            {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: id.toString()
            })
            .then(response => response.json())
            .then(response => {
                if (response.result === 'ok') {
                    // TODO : show protocol change message

                } else {
                    alert(response.reason);
                }
            });
    };


    const changeHandler = event => {
        const id = event.target.value;
        selectProtocol(id);
    };


    useEffect(() => {
        getProtocols();
    }, []);

    return (
        <Col as='select' md='8' xs='8' style={SELECT} onChange={changeHandler}>
            {
                protocols.map(
                    (protocol, index) =>
                        <option key={index}
                            style={OPTION}
                            value={protocol.id}
                            selected={protocol.name == props.protocolName}>
                            {protocol.name}
                        </option>
                )
            }
        </Col>
    );
}

export default ProtocolList;