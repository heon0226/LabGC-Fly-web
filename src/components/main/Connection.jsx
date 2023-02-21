import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { LABEL, LABEL_BORDERD } from '../../Styles';

const Connection = props => {
    return (
        <Col >
            <Row>
                <Col style={LABEL}>Serial Number</Col>
                <Col style={LABEL_BORDERD}>{props.serialNumber}</Col>
            </Row>
            
            <Row>
                <Col style={LABEL}>Status</Col>
                <Col style={LABEL_BORDERD}>{props.isConnected ? 'Connected' : 'Disconnected'}</Col>
            </Row>
        </Col>
    )
}

export default Connection;