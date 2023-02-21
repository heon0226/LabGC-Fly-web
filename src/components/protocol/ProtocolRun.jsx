import React, { useState } from 'react';
import { Button, FormControl, Badge } from 'react-bootstrap';
import { usePost } from '../../API';
import Card from '../Card'

const ProtocolRun = ({running}) => {
    const [protocol, setProtocol] = useState('home\nmagnet off\ngoto 11\npumping down full\npumping up 900\npumping down full\npumping sup 900\npumping sdown full\nmagnet on\npumping sdown 300\nwaiting 5');

    const post = usePost();
    const stop = event => {
        post('stop')
    };
    const run = (event) => {
        post('protocol_run ' + protocol)
    };
    const check = (event) => {
        post('protocol_check ' + protocol, () => alert('checked, ok'))
    };

    const onKeyDown = event => {
        // Event KeyCode 
        const TAB_CODE = 9;
        const ENTER_CODE = 13;

        if (event.keyCode === TAB_CODE) {
            event.preventDefault();
            const value = event.target.value;   // text value
            const start = event.target.selectionStart; // selection start index
            const end = event.target.selectionEnd;  // selection end index
            event.target.value = value.substring(0, start) + '\t' + value.substring(end);   // insert \t
            event.target.selectionStart = event.target.selectionEnd = start + 1; // set selcetion index
            return false;
        }
        if (event.keyCode === ENTER_CODE) {
            const tempLines = event.target.value.split('\n')    // split by line
            const lines = tempLines.map(line => line.trim());   // remove margins
            event.target.value = lines.join('\n');              // combined by '\n'
        }
    };

    return(
        <Card title="Protocol">
            <FormControl as="textarea"
                widdth="100%" required rows="10" 
                value={protocol} onKeyDown={onKeyDown}
                onChange={event => setProtocol(event.target.value)} 
            />
            {running && <Badge variant="info" size="lg">running</Badge>}
            {!running && <Badge variant="light" size="lg">ready</Badge>}
            <Button 
                variant={running ? "outline-secondary" : "secondary"} 
                disabled={running} 
                onClick={check}>Check
            </Button>
            <Button 
                variant={running ? "outline-secondary" : "secondary"} 
                disabled={running} 
                onClick={run}>Run
            </Button>
            <Button variant="secondary" onClick={stop}>Stop</Button>
        </Card>
    );
}


export default ProtocolRun;