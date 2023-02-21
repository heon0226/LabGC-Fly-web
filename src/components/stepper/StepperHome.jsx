import React from 'react';
import { usePost } from '../../API';
import { Button } from 'react-bootstrap';
import Card from '../Card'

const StepperHome = ({running, actuator, hasHome,
    hasGotoHome, hasSyncWithEncoderPosition, hasSetEncoderZeroPosition,
    hasGoUntil, hasReleaseSwitch, hasHomeShift, hasSaveBottomPosition}) => {
    const post = usePost();
    const stop = event => {
        console.log('stop');
        post('stop')
    }
    const home = (event) => {
        post(`${actuator} home`);
    }
    const gotoHome = (event) => {
        post(`${actuator} goto_home`);
    }
    const syncWithEncoderPosition = (event) => {
        post(`${actuator} sync_with_encoder_position`);
    }
    const setEncoderZeroPosition = (event) => {
        post(`${actuator} set_encoder_zero_position`);
    }
    const goUntil = (event) => {
        post(`${actuator} go_until`);
    }
    const releaseSwitch = (event) => {
        post(`${actuator} release_switch`);
    }
    const homeShift = (event) => {
        post(`${actuator} home_shift`);
    }
    const saveBottomPosition = (event) => {
        post(`${actuator} save_bottom_position`);
    }

    return(
        <Card title="Home">
            {hasHome && <Button variant="outline-secondary" disabled={running} onClick={home}>Home</Button>}
            {hasGotoHome && <Button variant="outline-secondary" disabled={running} onClick={gotoHome}>Go to Home</Button>}
            {hasGoUntil && <Button variant="outline-secondary" disabled={running} onClick={goUntil}>Go Until</Button>}
            {hasReleaseSwitch && <Button variant="outline-secondary" disabled={running} onClick={releaseSwitch}> Release Switch</Button>}
            {hasHomeShift && <Button variant="outline-secondary" disabled={running} onClick={homeShift}> Home Shift</Button>}
            {hasSetEncoderZeroPosition && <Button variant="outline-secondary" disabled={running} onClick={setEncoderZeroPosition}>Set Encoder Zero Position</Button>}
            {hasSyncWithEncoderPosition && <Button variant="outline-secondary" disabled={running} onClick={syncWithEncoderPosition}>Sync with Encoder Position</Button>}
            {hasSaveBottomPosition && <Button variant="outline-secondary" disabled={running} onClick={saveBottomPosition}>Save Bottom Position</Button>}

            <Button variant="secondary" onClick={stop}>Stop</Button>
        </Card>
    );
}

export default StepperHome;
