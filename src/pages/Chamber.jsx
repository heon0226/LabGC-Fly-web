import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { usePost } from '../API';
import StepperState from '../components/stepper/StepperState';
import StepperHome from '../components/stepper/StepperHome';
import StepperJog from '../components/stepper/StepperJog';
import StepperPosition from '../components/stepper/StepperPosition';
import Registers from '../components/stepper/Registers';


const Chamber = () => {
    const [driver_position, setDriverPosition] = useState(0.0);
    const [encoder_position, setEncoderPosition] = useState(0.0);
    const [running, setRunning] = useState(false);
    const [status_register, setStatusRegister] = useState(0)
    const [registers, setRegisters] = useState({});

    const post = usePost();
    const updateStatus = () => {
        post('get_chamber_status', (data) => {
            setDriverPosition(data.driver_position);
            setEncoderPosition(data.encoder_position);
            setRunning(data.running);
            setStatusRegister(data.registers.status)
            setRegisters(data.registers)
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
                        status_register={status_register}
                    />
                </Col>
                <Col md='6'>
                    <StepperHome running={running}
                        actuator="chamber"
                        hasHome hasGotoHome hasSyncWithEncoderPosition hasSetEncoderZeroPosition
                    />
                </Col>
                <Col md='6'>
                    <StepperJog running={running} actuator="chamber" unit="deg"/>
                </Col>
                <Col md='6'>
                    <StepperPosition running={running} actuator="chamber" unit="deg"/>
                </Col>
            </Row>
            <Row >
                <Col xs='12' md='12'>
                    <Registers actuator="chamber" running={running} registers={registers}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Chamber;
