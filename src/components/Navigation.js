import React from "react";
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'


const Navigation = () => {
    return (
        <Nav variant="pills" defaultActiveKey="/" style={{marginBottom:"10px"}}>
            <Nav.Item>
                <LinkContainer to="/main">
                    <Nav.Link eventKey="/main">Main</Nav.Link>
                </LinkContainer>
                    {/* <Nav.Link eventKey="/" href="/">Main</Nav.Link> */}
            </Nav.Item>        
            <Nav.Item>
                <LinkContainer to="/protocol">
                    <Nav.Link eventKey="protocol">Protocol</Nav.Link>
                </LinkContainer>
            </Nav.Item>        
            <Nav.Item>
                <LinkContainer to="/chamber">
                    <Nav.Link eventKey="chamber">Chamber</Nav.Link>
                </LinkContainer>
            </Nav.Item>        
            <Nav.Item>
                <LinkContainer to="/syringe">
                    <Nav.Link eventKey="syringe" href="/syringe">Syringe</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/filter">
                    <Nav.Link eventKey="filter" href="/filter">Filter</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/magnet">
                    <Nav.Link eventKey="magnet" href="/magnet">Magnet</Nav.Link>
                </LinkContainer>
            </Nav.Item>
        </Nav>
)};

export default Navigation;
