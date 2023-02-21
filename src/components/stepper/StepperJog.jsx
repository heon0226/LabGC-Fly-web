import React from 'react';
import { usePost } from '../../API';
import { Button } from 'react-bootstrap';
import Card from '../Card'

const StepperJog = ({running, actuator, unit}) => {
    const post = usePost();

    const stop = event => {
        console.log('stop');
        post('stop')
    }
    const jogP = (event) => {
        post(`${actuator} jog + 1`);
    }
    const jogPP = (event) => {
        post(`${actuator} jog + 5`);
    }
    const jogPPP = (event) => {
        post(`${actuator} jog + 10`);
    }
    const jogN = (event) => {
        post(`${actuator} jog - 1`);
    }
    const jogNN = (event) => {
        post(`${actuator} jog - 5`);
    }
    const jogNNN = (event) => {
        post(`${actuator} jog - 10`);
    }
    let p_str = '+1'
    let pp_str = '+5'
    let ppp_str = '+10'
    let n_str = '-1'
    let nn_str = '-5'
    let nnn_str = '-10'
    if (actuator === 'syringe') {
      p_str = 'down 1'
      pp_str = 'down 5'
      ppp_str = 'down 10'
      n_str = 'up 1'
      nn_str = 'up 5'
      nnn_str = 'up 10'
    }

    return(
        <Card title="Jog">
            <Button variant="outline-secondary" disabled={running} onClick={jogP}>{p_str} {unit}</Button>
            <Button variant="outline-secondary" disabled={running} onClick={jogPP}>{pp_str} {unit}</Button>
            <Button variant="outline-secondary" disabled={running} onClick={jogPPP}>{ppp_str} {unit}</Button>
            <Button variant="outline-secondary" disabled={running} onClick={jogN}>{n_str} {unit}</Button>
            <Button variant="outline-secondary" disabled={running} onClick={jogNN}>{nn_str} {unit}</Button>
            <Button variant="outline-secondary" disabled={running} onClick={jogNNN}>{nnn_str} {unit}</Button>
            <Button variant="secondary" onClick={stop}>Stop</Button>
        </Card>
    );
}

export default StepperJog;
