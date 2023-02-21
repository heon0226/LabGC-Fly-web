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
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

const Volume = ({running}) => {
  const [volume_input, setVolumeInput] = useState('');
  const post = usePost();
  const stop = event => {
      console.log('stop');
      post('stop')
  }
  const volume = (event) => {
      post(`syringe volume ${volume_input}`);
  }

  return(
      <Card title="volume">
          <InputGroup>
              <FormControl 
                  placeholder="volume" 
                  as="input" 
                  value={volume_input} 
                  onChange={event => setVolumeInput(event.target.value)}
              >
              </FormControl>
              <Button variant="outline-secondary" disabled={running} onClick={volume}>Go [uL]</Button>
              <Button variant="secondary" onClick={stop}>Stop</Button>
          </InputGroup>
      </Card>
  );
}


const Syringe = () => {
    const [driver_position, setDriverPosition] = useState(0.0);
    const [encoder_position, setEncoderPosition] = useState(0.0);
    const [velocity, setVelocity] = useState(0.0);
    const [running, setRunning] = useState(false);
    const [status, setStatus] = useState(0)
    const [switch_mode, setSwitchMode] = useState(0)
    const [registers, setRegisters] = useState({});

    const post = usePost();
    const updateStatus = () => {
        post('get_syringe_status', (data) => {
            setDriverPosition(data.driver_position);
            setEncoderPosition(data.encoder_position);
            setVelocity(data.velocity);
            setRunning(data.running);
            // setStatusRegister(data.registers.status)
            setStatus(data.registers.ramp_stat)
            setSwitchMode(data.registers.sw_mode)
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
                        velocity={velocity} status={status} switch_mode={switch_mode}
                    />
                </Col>
                <Col md='6'>
                    <StepperHome running={running}
                        actuator="syringe"
                        hasHome 
                        hasReleaseSwitch hasSearchSwitch hasGoToSwitchLatchPosition
                        hasSearchEncoderNSignal hasGoToEncoderNSignal
                        hasSetHomePosition hasShiftFromHome hasFinishHome
                        hasSaveSyringeBottomPosition
                    />
                </Col>
                <Col md='6'>
                    <StepperJog running={running} actuator="syringe" unit="mm"/>
                </Col>
                <Col md='6'>
                    <StepperPosition running={running} actuator="syringe" unit="mm"/>
                </Col>
                <Col md='6'>
                    <Volume running={running}/>
                </Col>
            </Row>
            <Row >
                <Col xs='12' md='12'>
                    <Registers actuator="syringe" running={running} registers={registers}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Syringe;
