import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { LABEL, LABEL_BORDERD } from '../../Styles';

const Progress = props => {
    return (
        <Col>
            <Row>
                <Col style={LABEL}>Protocol</Col>
                <Col style={LABEL_BORDERD}>{props.protocolName}</Col>
            </Row>

            <Row>
                <Col style={LABEL}>State</Col>
                <Col style={LABEL_BORDERD}>{props.state}</Col>
            </Row>

            <Row>
                <Col style={LABEL}>Total Sec</Col>
                <Col style={LABEL_BORDERD}>{props.remainingTotalSec}</Col>
            </Row>
        </Col>
    );
}

export default Progress;