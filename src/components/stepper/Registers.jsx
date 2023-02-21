import React, { useState } from 'react';
import { usePost } from '../../API';
import { Row, Col, Button } from 'react-bootstrap';
import Card from '../Card'

function createData(value, writable, hexDisplay) {
    return { value, writable, hexDisplay, input:'' };
}
const registers_info = {
  'gconf': createData(0, true, true),
  'gstat': createData(0, false, true),
  'ifcnt': createData(0, false, true),
  'slaveconf': createData(0, true, false),
  'ioin': createData(0, false, true),
  'x_comapre': createData(0, true, false),
  'ihold_irun': createData(0, true, false),
  'tpowerdown': createData(0, true, false),
  'tstep': createData(0, false, true),
  'tpwmthrs': createData(0, true, false),
  'tcoolthrrs': createData(0, true, false),
  'thigh': createData(0, true, false),
  'rampmode': createData(0, true, true),
  'xactual': createData(0, true, true),
  'vactual': createData(0, true, false),
  'vstart': createData(0, true, false),
  'a1': createData(0, true, false),
  'v1': createData(0, true, false),
  'amax': createData(0, true, false),
  'vmax': createData(0, true, false),
  'dmax': createData(0, true, false),
  'vstop': createData(0, true, false),
  'tzerowait': createData(0, true, true),
  'xtarget': createData(0, true, false),
  'vdcmin': createData(0, true, false),
  'sw_mode': createData(0, true, true),
  'ramp_stat': createData(0, false, true),
  'xlatch': createData(0, false, false),
  'encmode': createData(0, true, true),
  'x_enc': createData(0, true, false),
  'enc_const': createData(0, true, false),
  'enc_status': createData(0, false, true),
  'enc_latch': createData(0, false, false),
  'mslut0': createData(0, false, false),
  'mslut1': createData(0, false, false),
  'mslut2': createData(0, false, false),
  'mslut3': createData(0, false, false),
  'mslut4': createData(0, false, false),
  'mslut5': createData(0, false, false),
  'mslut6': createData(0, false, false),
  'mslut7': createData(0, false, false),
  'mslutsel': createData(0, false, false),
  'mslutstart': createData(0, false, false),
  'mscnt': createData(0, false, true),
  'mscuract': createData(0, false, true),
  'chopconf': createData(0, true, false),
  'coolconf': createData(0, true, false),
  'dcctrl': createData(0, true, false),
  'drvstatus': createData(0, false, true),
  'pwmconf': createData(0, true, false),
  'pwm_scale': createData(0, false, true),
  'encm_ctrl': createData(0, true, false),
  'lost_steps': createData(0, false, true),
}

const Register = ({ name, info, running, actuator }) => {
    const [input, setInput] = useState('');
    const onInputChange = (event) => {setInput(event.target.value);};

    const post = usePost();
    const write = event => {
        // post(`set_register syringe ${name} ${input}`);
        post(`set_register ${actuator} ${name} ${input}`);
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
        if (key in registers_info) {
          registers_info[key].value = value
        }
    });

    return(
        <Card title="Registers">
            <Row xs='1' md='2'>
                {Object.entries(registers_info).map(([key, value]) => (
                <Col key={key} >
                    <Register name={key} info={value} running={running} actuator={actuator}>
                    </Register>
                </Col>
                ))}
            </Row>
        </Card>
    );
};

export default Registers;
