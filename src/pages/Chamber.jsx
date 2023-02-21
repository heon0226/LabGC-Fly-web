import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { usePost } from '../API';
import StepperState from '../components/stepper/StepperState';
import StepperHome from '../components/stepper/StepperHome';
import StepperJog from '../components/stepper/StepperJog';
import StepperPosition from '../components/stepper/StepperPosition';
import Registers from '../components/stepper/Registers';
import Card from '../components/Card';
import {Button} from 'react-bootstrap';


const Goto = ({running}) => {
  const post = usePost();

  const stop = event => {
      console.log('stop');
      post('stop')
  }
  const goto_1 = (event) => {
      post(`chamber goto 1`);
  }
  const goto_2 = (event) => {
    post(`chamber goto 2`);
  }
  const goto_3 = (event) => {
    post(`chamber goto 3`);
  }
  const goto_4 = (event) => {
    post(`chamber goto 4`);
  }
  const goto_5 = (event) => {
    post(`chamber goto 5`);
  }
  const goto_6 = (event) => {
    post(`chamber goto 6`);
  }
  const goto_7 = (event) => {
    post(`chamber goto 7`);
  }
  const goto_8 = (event) => {
    post(`chamber goto 8`);
  }
  const goto_9 = (event) => {
    post(`chamber goto 9`);
  }
  const goto_10 = (event) => {
    post(`chamber goto 10`);
  }
  const goto_11 = (event) => {
    post(`chamber goto 11`);
  }
  const goto_12 = (event) => {
    post(`chamber goto 12`);
  }
  const goto_13 = (event) => {
    post(`chamber goto 13`);
  }
  return(
      <Card title="Goto">
          <Button variant="outline-secondary" disabled={running} onClick={goto_1}>1</Button>
          <Button variant="outline-secondary" disabled={running} onClick={goto_2}>2</Button>
          <Button variant="outline-secondary" disabled={running} onClick={goto_3}>3</Button>
          <Button variant="outline-secondary" disabled={running} onClick={goto_4}>4</Button>
          <Button variant="outline-secondary" disabled={running} onClick={goto_5}>5</Button>
          <Button variant="outline-secondary" disabled={running} onClick={goto_6}>6</Button>
          <Button variant="outline-secondary" disabled={running} onClick={goto_7}>7</Button>
          <Button variant="outline-secondary" disabled={running} onClick={goto_8}>8</Button>
          <Button variant="outline-secondary" disabled={running} onClick={goto_9}>9</Button>
          <Button variant="outline-secondary" disabled={running} onClick={goto_10}>10</Button>
          <Button variant="outline-secondary" disabled={running} onClick={goto_11}>11</Button>
          <Button variant="outline-secondary" disabled={running} onClick={goto_12}>12</Button>
          <Button variant="outline-secondary" disabled={running} onClick={goto_13}>13</Button>
          <Button variant="secondary" onClick={stop}>Stop</Button>
      </Card>
  );
}

const Chamber = () => {
    const [driver_position, setDriverPosition] = useState(0.0);
    const [encoder_position, setEncoderPosition] = useState(0.0);
    const [velocity, setVelocity] = useState(0.0);
    const [running, setRunning] = useState(false);
    const [status, setStatus] = useState(0)
    const [switch_mode, setSwitchMode] = useState(0)
    const [encoder_mode, setEncoderMode] = useState(0)
    const [registers, setRegisters] = useState({});

    const post = usePost();
    const updateStatus = () => {
        post('get_chamber_status', (data) => {
            // console.log(data);
            setDriverPosition(data.driver_position);
            setEncoderPosition(data.encoder_position);
            setVelocity(data.velocity);
            setRunning(data.running);
            // setStatusRegister(data.registers.status)
            setStatus(data.registers.ramp_stat)
            setSwitchMode(data.registers.sw_mode)
            setEncoderMode(data.registers.encmode)
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
                        velocity={velocity}
                        status={status}
                        switch_mode={switch_mode}
                        encoder_mode={encoder_mode}
                    />
                </Col>
                <Col md='6'>
                    <StepperHome running={running}
                        actuator="chamber"
                        hasHome 
                        hasSearchEncoderNSignal hasGoToEncoderNSignal hasGoToChamberOffsetPosition
                        hasSetHomePosition hasShiftFromHome hasFinishHome hasSaveChamberOffsetPosition
                    />
                </Col>
                <Col md='6'>
                    <StepperJog running={running} actuator="chamber" unit="deg"/>
                </Col>
                <Col md='6'>
                    <Goto running={running}/>
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
