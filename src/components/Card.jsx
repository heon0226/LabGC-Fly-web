import React from 'react';
import { Container } from 'react-bootstrap';

const style = {
    // width: 'auto',
    border: '1px solid rgba(0, 0, 0, .4)',
    borderRadius: '10px',
    // display: 'flex',
    // margin: '5% auto',
    marginBottom: '12px',
    // padding: '10px',
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    backgroundColor: 'whitesmoke',
};

const Card = ( {title, children} ) => {
    return(
        <Container style={style} className="p-2 mb-10 rounded-3">
            <h5>{title}</h5>
            {children}
        </Container>
    );    
}

export default Card;
