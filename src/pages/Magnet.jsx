import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import Card from '../components/Card'
import { usePost } from '../API';


const Magnet = () => {
    const [running, setRunning] = useState(false);

    const post = usePost();
    const stop = event => {
        post('stop')
    }
    const magnetOn = (event) => {
        post('magnet on');
    }
    const magnetOff = (event) => {
        post('magnet off');
    }
    const magnetHome = (event) => {
        post('magnet home');
    }
    const updateStatus = () => {
        post('get_magnet_status', (data) => {
            setRunning(data.running);
        } )
    };
    // state life cycle function
    useEffect(() => {
        // component did mount
        const statusTimer = setInterval(updateStatus, 500); // set update timer (interval : 0.5s)
        // component will unmount
        return () => {
            clearInterval(statusTimer);  // clear update timer
        };
    }, []);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md='6'>
                    <Card title="Home">
                    {running && <Badge variant="info" size="lg">running</Badge>}
                    {!running && <Badge variant="light" size="lg">ready</Badge>}
                        <Button variant="outline-secondary" disabled={running} onClick={magnetOn}>On</Button>
                        <Button variant="outline-secondary" disabled={running} onClick={magnetOff}>Off</Button>
                        <Button variant="outline-secondary" disabled={running} onClick={magnetHome}>Home</Button>
                        <Button variant="secondary" onClick={stop}>Stop</Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Magnet;