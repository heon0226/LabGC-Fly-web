import React from 'react';
import { usePost } from '../../API';
import { Badge, Button } from 'react-bootstrap';
import Card from '../Card'
// import StatusRegister from './StatusRegister';

const StatusRegister = ( {status_register} ) => {

    return(
        <div>
            <Badge variant={ (status_register & 0x0004) && 'warning'}>sw_f</Badge>
            <Badge variant={ (status_register & 0x0008) && 'warning'}>sw_evn</Badge>
            <Badge variant={ (status_register & 0x0080) && 'warning'}>notperf_cmd</Badge>
            <Badge variant={ (status_register & 0x0100) && 'warning'}>wrong_cmd</Badge>
            <Badge variant={!(status_register & 0x0200) && 'warning'}>uvlo</Badge>
            <Badge variant={!(status_register & 0x0400) && 'warning'}>th_wrn</Badge>
            <Badge variant={!(status_register & 0x0800) && 'warning'}>th_sd</Badge>
            <Badge variant={!(status_register & 0x1000) && 'warning'}>ocd</Badge>
            <Badge variant={!(status_register & 0x6000) && 'warning'}>step_losses</Badge>
            <Badge variant={!(status_register & 0x2000) && 'warning'}>step_loss_a</Badge>
            <Badge variant={!(status_register & 0x4000) && 'warning'}>step_loss_b</Badge>
        </div>
    );
}

const StepperState = ({running, driver_position, encoder_position, status_register}) => {
    const post = usePost();
    const stop = event => {
        console.log('stop');
        post('stop')
    }

    return(
        <Card title="State">
            driver pos: {`${driver_position.toFixed(1)}`} {', '}
            encoder pos: {`${encoder_position.toFixed(1)}`}
            {running && <Badge variant="info" size="lg">running</Badge>}
            {!running && <Badge variant="light" size="lg">ready</Badge>}
            <Button variant="secondary" onClick={stop}>Stop</Button>
            <StatusRegister status_register={status_register}/>
        </Card>
    );
}

export default StepperState;
