import React, {useState} from 'react';
import { usePost } from '../../API';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Card from '../Card'



const StepperPosition = ({running, actuator, unit}) => {
    const [position_input, setPositionInput] = useState('');

    const post = usePost();
    const stop = event => {
        console.log('stop');
        post('stop')
    }
    const position = (event) => {
        post(`${actuator} position ${position_input}`);
    }

    return(
        <Card title="Position">
            <InputGroup>
                <FormControl 
                    placeholder="position" 
                    as="input" 
                    value={position_input} 
                    onChange={event => setPositionInput(event.target.value)}
                >
                </FormControl>
                <Button variant="outline-secondary" disabled={running} onClick={position}>Go [{unit}]</Button>
                <Button variant="secondary" onClick={stop}>Stop</Button>
            </InputGroup>
        </Card>
    );
}

export default StepperPosition;


