import React, { useState } from 'react';
import { usePost } from '../../API';
import { Button, Modal } from 'react-bootstrap';
import Card from '../Card'

const ConfirmModal = ({ show, message, handleClose, handleConfirm }) => {
    const confirm = () => {
        if (handleConfirm) {
            handleConfirm();
        }
        handleClose();
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Waring</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const StepperHome = ({ running, actuator, hasHome,
    hasReleaseSwitch, hasSearchSwitch, hasGoToSwitchLatchPosition,
    hasSearchEncoderNSignal, hasGoToEncoderNSignal,
    hasGoToChamberOffsetPosition,
    hasSetHomePosition, hasShiftFromHome, hasFinishHome,
    hasSaveChamberOffsetPosition, hasSaveSyringeBottomPosition
  }) => {
    const post = usePost();
    const stop = event => {
        console.log('stop');
        post('stop')
    }
    const home = (event) => {
        post(`${actuator} home`);
    }
    const release_switch = (event) => {
      post(`${actuator} release_switch`);
    }
    const search_switch = (event) => {
      post(`${actuator} search_switch`);
    } 
    const go_to_switch_latch_position = (event) => {
      post(`${actuator} go_to_switch_latch_position`);
    } 
    const search_encoder_n_signal = (event) => {
      post(`${actuator} search_encoder_n_signal`);
    }
    const go_to_encoder_n_signal = (event) => {
      post(`${actuator} go_to_encoder_n_signal`);
    } 
    const go_to_chamber_offset_position = (event) => {
      post(`${actuator} go_to_offset_position`);
    } 
    const set_home_position = (event) => {
      post(`${actuator} set_home_position`);
    } 
    const shift_from_home = (event) => {
      post(`${actuator} shift_from_home`);
    } 
    const finish_home = (event) => {
      post(`${actuator} finish_home`);
    } 
    const saveChamberOffsetPosition = (event) => {
      post(`${actuator} save_offset_position`, () => alert('Chamber driver offset position has been saved to file.'));
    }
    const saveSyringeBottomPosition = (event) => {
      post(`${actuator} save_bottom_position`, () => alert('Syringe driver bottom position has been saved to file.'));
    }


    // confirm modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [handleConfirm, setHandleConfirm] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState('');
    const confirmSaveChamberOffsetPosition = (event) => {
      setConfirmMessage('Chamber offset position will be saved to file. Are you sure?')
      setHandleConfirm(() => () => { saveChamberOffsetPosition() });
      handleShow();
    }
    const confirmSaveSyringeBottomPosition = (event) => {
      setConfirmMessage('Syringe bottom position will be saved to file. Are you sure?')
      setHandleConfirm(() => () => { saveSyringeBottomPosition() });
      handleShow();
  }

    return (
        <Card title="Home">
            {hasHome && <Button variant="outline-secondary" disabled={running} onClick={home}>Home</Button>}
            {hasReleaseSwitch && <Button variant="outline-secondary" disabled={running} onClick={release_switch}>Release Switch</Button>}
            {hasSearchSwitch && <Button variant="outline-secondary" disabled={running} onClick={search_switch}>Search Switch</Button>}
            {hasGoToSwitchLatchPosition && <Button variant="outline-secondary" disabled={running} onClick={go_to_switch_latch_position}>Go To Switch Latch Position</Button>}
            {hasSearchEncoderNSignal && <Button variant="outline-secondary" disabled={running} onClick={search_encoder_n_signal}>Search Encoder N Signal</Button>}
            {hasGoToEncoderNSignal && <Button variant="outline-secondary" disabled={running} onClick={go_to_encoder_n_signal}>Go To Encoder N Signal</Button>}
            {hasGoToChamberOffsetPosition && <Button variant="outline-secondary" disabled={running} onClick={go_to_chamber_offset_position}>Go To Chamber Offset Position</Button>}
            {hasSetHomePosition && <Button variant="outline-secondary" disabled={running} onClick={set_home_position}>Set Home Position</Button>}
            {hasShiftFromHome && <Button variant="outline-secondary" disabled={running} onClick={shift_from_home}>Shift From Home</Button>}
            {hasFinishHome && <Button variant="outline-secondary" disabled={running} onClick={finish_home}>Finish Home</Button>}
            <Button variant="secondary" onClick={stop}>Stop</Button>
            {hasSaveChamberOffsetPosition && <Button variant="outline-secondary" disabled={running} onClick={confirmSaveChamberOffsetPosition}>Save Chamber Offset Position</Button>}
            {hasSaveSyringeBottomPosition && <Button variant="outline-secondary" disabled={running} onClick={confirmSaveSyringeBottomPosition}>Save Syringe Bottom Position</Button>}
            <ConfirmModal show={show} handleClose={handleClose} handleConfirm={handleConfirm} message={confirmMessage} />
        </Card>
    );
}

export default StepperHome;
