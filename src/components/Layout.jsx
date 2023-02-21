import React from 'react';
import Container from 'react-bootstrap/Container';

const style = {
    width: 'auto',
    border: '1px solid rgba(0, 0, 0, .4)',
    display: 'flex',
    margin: '5% auto',
    padding: '10px',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'whitesmoke',

};

const Layout = (props) => {
    return (
        <Container style={style} className="justify-content-md-center">
            {props.children}
        </Container>
    );
}

export default Layout;