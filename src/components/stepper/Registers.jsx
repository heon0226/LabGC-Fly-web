import React, { useState } from 'react';
import { usePost } from '../../API';
import { Row, Col, Button } from 'react-bootstrap';
import Card from '../Card'

function createData(value, writable, hexDisplay) {
    return { value, writable, hexDisplay, input:'' };
}
const registers_info = {
    'abs_pos': createData(0, true, false),
    'acc': createData(0, true, false),
    'adc_out': createData(0, false, false),
    'alram_en': createData(0, true, true),
    'config': createData(0, true, true),
    'dec': createData(0, true, false),
    'el_pos': createData(0, false, false),
    'fn_slp_acc': createData(0, true, false),
    'fn_slp_dec': createData(0, true, false),
    'fs_spd': createData(0, true, false),
    'int_spd': createData(0, true, false),
    'k_therm': createData(0, true, false),
    'kval_acc': createData(0, true, false),
    'kval_dec': createData(0, true, false),
    'kval_hold': createData(0, true, false),
    'kval_run': createData(0, true, false),
    'mark': createData(0, true, false),
    'max_speed': createData(0, true, false),
    'min_speed': createData(0, true, false),
    'ocd_th': createData(0, true, false),
    'speed': createData(0, false, false),
    'st_slp': createData(0, true, false),
    'stall_th': createData(0, true, false),
    'status': createData(0, false, true),
    'step_mode': createData(0, true, true),
}

const Register = ({ name, info, running }) => {
    const [input, setInput] = useState('');
    const onInputChange = (event) => {setInput(event.target.value);};

    const post = usePost();
    const write = event => {
        post(`set_register syringe ${name} ${input}`);
    }

    return(
        <Row>
            <Col xs='3' md='3'>{name}</Col>
            <Col align='right' xs='3' md='3'>
                {info.hexDisplay ? `0x${info.value.toString(16)}` : `${info.value}`}
            </Col>
            <Col
                as='input' xs='3' md='3' value={input} disabled={!info.writable}
                onChange={onInputChange}
            >
            </Col>
            <Col xs='2' md='2'>
                <Button variant="outline-secondary" disabled={running || !info.writable} onClick={write}>write</Button>
            </Col>
    </Row>
);
}

const Registers = ({actuator, running, registers}) => {
    Object.entries(registers).forEach(([key, value]) => {
        registers_info[key].value = value
    });

    return(
        <Card title="Registers">
            <Row xs='1' md='2'>
                {Object.entries(registers_info).map(([key, value]) => (
                <Col key={key} >
                    <Register name={key} info={value} running={running} acutator={actuator}>
                    </Register>
                </Col>
                ))}
            </Row>
        </Card>
    );
};

export default Registers;
