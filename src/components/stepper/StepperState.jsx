import React from 'react';
import { usePost } from '../../API';
import { Badge, Button } from 'react-bootstrap';
import Card from '../Card'
// import StatusRegister from './StatusRegister';

const StatusRegister = ( {status} ) => {

  return(
      <div>
          status:
          <Badge variant={ (status & 0x0001) && 'warning'}>stop_l</Badge>
          <Badge variant={ (status & 0x0002) && 'warning'}>stop_r</Badge>
          <Badge variant={ (status & 0x0004) && 'warning'}>latch_l</Badge>
          <Badge variant={ (status & 0x0008) && 'warning'}>latch_r</Badge>
          <Badge variant={ (status & 0x0010) && 'warning'}>ev_stop_l</Badge>
          <Badge variant={ (status & 0x0020) && 'warning'}>ev_stop_r</Badge>
          <Badge variant={ (status & 0x0040) && 'warning'}>ev_stop_sg</Badge>
          <Badge variant={ (status & 0x0080) && 'warning'}>ev_pos_reached</Badge>
          <Badge variant={ (status & 0x0100) && 'warning'}>velocity_reached</Badge>
          <Badge variant={ (status & 0x0200) && 'warning'}>position_reached</Badge>
          <Badge variant={ (status & 0x0400) && 'warning'}>vzero</Badge>
          <Badge variant={ (status & 0x0800) && 'warning'}>t_zerowait_active</Badge>
          <Badge variant={ (status & 0x1000) && 'warning'}>second_move</Badge>
          <Badge variant={ (status & 0x2000) && 'warning'}>sg</Badge>
      </div>
  );
}
const SwitchModeRegister = ( {switch_mode} ) => {

  return(
      <div>
          switch_mode:
          <Badge variant={ (switch_mode & 0x0001) && 'warning'}>en_stop_l</Badge>
          <Badge variant={ (switch_mode & 0x0002) && 'warning'}>en_stop_r</Badge>
          <Badge variant={ (switch_mode & 0x0004) && 'warning'}>pol_stop_l</Badge>
          <Badge variant={ (switch_mode & 0x0008) && 'warning'}>pol_stop_r</Badge>
          <Badge variant={ (switch_mode & 0x0010) && 'warning'}>swap_lr</Badge>
          <Badge variant={ (switch_mode & 0x0020) && 'warning'}>latch_l_active</Badge>
          <Badge variant={ (switch_mode & 0x0040) && 'warning'}>latch_l_inactive</Badge>
          <Badge variant={ (switch_mode & 0x0080) && 'warning'}>latch_r_active</Badge>
          <Badge variant={ (switch_mode & 0x0100) && 'warning'}>latch_r_inactive</Badge>
          <Badge variant={ (switch_mode & 0x0200) && 'warning'}>en_latch_encoder</Badge>
          <Badge variant={ (switch_mode & 0x0400) && 'warning'}>sg_stop</Badge>
          <Badge variant={ (switch_mode & 0x0800) && 'warning'}>en_softstop</Badge>
      </div>
  );
}
const EncoderModeRegister = ( {encoder_mode} ) => {

  return(
      <div>
          encoder_mode:
          <Badge variant={ (encoder_mode & 0x0001) && 'warning'}>pol_A</Badge>
          <Badge variant={ (encoder_mode & 0x0002) && 'warning'}>pol_B</Badge>
          <Badge variant={ (encoder_mode & 0x0004) && 'warning'}>pol_N</Badge>
          <Badge variant={ (encoder_mode & 0x0008) && 'warning'}>ignore_AB</Badge>
          <Badge variant={ (encoder_mode & 0x0010) && 'warning'}>clr_cont</Badge>
          <Badge variant={ (encoder_mode & 0x0020) && 'warning'}>clr_once</Badge>
          <Badge variant={ (encoder_mode & 0x0040) && 'warning'}>pos_edge</Badge>
          <Badge variant={ (encoder_mode & 0x0080) && 'warning'}>neg_edge</Badge>
          <Badge variant={ (encoder_mode & 0x0100) && 'warning'}>clr_enc_x</Badge>
          <Badge variant={ (encoder_mode & 0x0200) && 'warning'}>latch_x_act</Badge>
          <Badge variant={ (encoder_mode & 0x0400) && 'warning'}>enc_sel_decimal</Badge>
      </div>
  );
}

const StepperState = ({running, driver_position, encoder_position, velocity, switch_mode, encoder_mode, status}) => {
    const post = usePost();
    const stop = event => {
        console.log('stop');
        post('stop')
    }

    return(
        <Card title="State">
            driver pos: {`${driver_position.toFixed(1)}`} {', '}
            encoder pos: {`${encoder_position.toFixed(1)}`} {', '}
            velocity: {`${velocity.toFixed(1)}`}
            {running && <Badge variant="info" size="lg">running</Badge>}
            {!running && <Badge variant="light" size="lg">ready</Badge>}
            <Button variant="secondary" onClick={stop}>Stop</Button>
            <StatusRegister status={status}/>
            <SwitchModeRegister switch_mode={switch_mode}/>
            <EncoderModeRegister encoder_mode={encoder_mode}/>
        </Card>
    );
}

export default StepperState;
