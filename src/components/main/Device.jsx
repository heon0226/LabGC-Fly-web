import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { LABEL, LABEL_BORDERD } from '../../Styles';

const Device = props => {
    return (
        <Col>

            {/* Empty Code */}
            <Row>
                <Col style={LABEL}>&nbsp;</Col>
            </Row>
            {/* Empty Code */}

             
            <Row>
                <Col style={LABEL}>Temperature</Col>
                <Col style={LABEL_BORDERD}>{props.temperature + '℃'}</Col>
            </Row>

            
        </Col>
    )
}

export default Device;

