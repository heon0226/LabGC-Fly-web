import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Badge } from 'react-bootstrap';
import { usePost } from '../../API';
import Card from '../Card'

const CommandRun = ({running}) => {
    const [command, setCommand] = useState('chamber goto 3');

    const post = usePost();
    const stop = event => {
        post('stop')
    }
    const run = (event) => {
        post(command);
    }
    return(
        <Card title="Command">
            <InputGroup>
                {running && <Badge variant="info" size="lg">running</Badge>}
                {!running && <Badge variant="light" size="lg">ready</Badge>}
                <FormControl 
                    placeholder="command" 
                    as="input" 
                    value={command} 
                    onChange={event => setCommand(event.target.value)}
                >
                </FormControl>
                <Button 
                    variant={running ? "outline-secondary" : "secondary"} 
                    disabled={running} 
                    onClick={run}>Run
                </Button>
                <Button variant="secondary" onClick={stop}>Stop</Button>
            </InputGroup>
        </Card>
    );
}


export default CommandRun;