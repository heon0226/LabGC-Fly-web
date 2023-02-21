import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { usePost } from '../API';
import Card from '../components/Card';
import CommandRun from '../components/protocol/CommandRun';
import ProtocolRun from '../components/protocol/ProtocolRun';

const Status = ( {children} ) => {
    return(
        <Card title="Status">
            {children}
        </Card>
    );
}

const Protocol = () => {
    const [running, setRunning] = useState(false);
    const [runningCommand, setRunningCommand] = useState('');

    const post = usePost();
    const updateStatus = () => {
        post('get_status', (data) => {
            setRunning(data.running);
            setRunningCommand(data.runningCommand);
            // console.log(data);
        } )
    };
    // state life cycle function
    useEffect(() => {
        // component did mount
        const statusTimer = setInterval(updateStatus, 500); // set update timeer (interval : 0.5s)
        // component will unmount
        return () => {
            clearInterval(statusTimer);  // clear update timer
        };
    }, []);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md='6'>
                    <CommandRun running={running} />
                </Col>
                <Col md='6'>
                    <Status>
                        running command: {runningCommand}
                    </Status>
                </Col>
                <Col md='6'>
                    <ProtocolRun running={running} />
                </Col>
            </Row>
        </Container>
    );
}

export default Protocol;