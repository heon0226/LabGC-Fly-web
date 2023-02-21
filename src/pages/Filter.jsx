import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { usePost } from '../API';
import StepperState from '../components/stepper/StepperState';
import StepperHome from '../components/stepper/StepperHome';
import StepperJog from '../components/stepper/StepperJog';
import StepperPosition from '../components/stepper/StepperPosition';
import Registers from '../components/stepper/Registers';

const Filter = () => {
    const [driver_position, setDriverPosition] = useState(0.0);
    const [encoder_position, setEncoderPosition] = useState(0.0);
    const [velocity, setVelocity] = useState(0.0);
    const [running, setRunning] = useState(false);
    const [status, setStatus] = useState(0)
    const [switch_mode, setSwitchMode] = useState(0)
    const [registers, setRegisters] = useState({});

    const post = usePost();
    const updateStatus = () => {
        post('get_filter_status', (data) => {
            setDriverPosition(data.driver_position);
            setEncoderPosition(data.encoder_position);
            setVelocity(data.velocity);
            setRunning(data.running);
            // setStatusRegister(data.registers.status)
            setStatus(data.registers.ramp_stat)
            setSwitchMode(data.registers.sw_mode)
            setRegisters(data.registers)
            // console.log(data);
        } )
    };
    // state life cycle function
    useEffect(() => {
        // component did mount
        const statusTimer = setInterval(updateStatus, 500); // set update timer (interval : 0.5s)
        // component will unmount
        return () => {
            clearInterval(statusTimer);  // clear update timer
        };
    }, []);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md='6'>
                    <StepperState 
                        running={running} driver_position={driver_position} encoder_position={encoder_position}
                        velocity={velocity}
                        status={status} switch_mode={switch_mode}
                    />
                </Col>
                <Col md='6'>
                    <StepperHome running={running}
                        actuator="filter"
                        hasHome hasReleaseSwitch hasSearchSwitch hasGoToSwitchLatchPosition
                        hasSetHomePosition hasShiftFromHome hasFinishHome
                    />
                </Col>
                <Col md='6'>
                    <StepperJog running={running} actuator="filter" unit="deg"/>
                </Col>
                <Col md='6'>
                    <StepperPosition running={running} actuator="filter" unit="deg"/>
                </Col>
            </Row>
            <Row >
                <Col xs='12' md='12'>
                    <Registers actuator="filter" running={running} registers={registers}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Filter;