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

    return(
        <Card title="Jog">
            <Button variant="outline-secondary" disabled={running} onClick={jogP}>+1 {unit}</Button>
            <Button variant="outline-secondary" disabled={running} onClick={jogPP}>+5 {unit}</Button>
            <Button variant="outline-secondary" disabled={running} onClick={jogPPP}>+10 {unit}</Button>
            <Button variant="outline-secondary" disabled={running} onClick={jogN}>-1 {unit}</Button>
            <Button variant="outline-secondary" disabled={running} onClick={jogNN}>-5 {unit}</Button>
            <Button variant="outline-secondary" disabled={running} onClick={jogNNN}>-10 {unit}</Button>
            <Button variant="secondary" onClick={stop}>Stop</Button>
        </Card>
    );
}

export default StepperJog;
