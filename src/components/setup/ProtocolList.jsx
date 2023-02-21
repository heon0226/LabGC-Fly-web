import React from 'react';
import { ListGroup } from 'react-bootstrap';

const styles = {
    selected: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        fontFamily: 'Consolas, sans-serif',
        padding: "5px",
        border: 'none',
        borderRadius: '0px',
    },
    default: {
        backgroundColor: "#FFF",
        fontFamily: 'Consolas, sans-serif',
        padding: "5px",
        border: 'none',
        borderRadius: '0px'

    },
    listGroup: {
        width: '100%',
        height: "120px",
        overflowY: "scroll",
        backgroundColor: "white",
        borderRadius: '0px',
        margin: '10px'

    },
    button: {
        width: "100%",
        margin: "10px",
        justifyContent: "center",
    }

}

const ProtocolList = props => {
    return (
        <ListGroup style={styles.listGroup}>
            {
                props.protocols.map(
                    (protocol, index) => {
                        return (
                            <ListGroup.Item
                                key={index} id={index}
                                onClick={props.handler}
                                style={protocol.selected
                                    ? styles.selected
                                    : styles.default} >
                                {protocol.name}
                            </ListGroup.Item>
                        )

                    }
                )
            }
        </ListGroup>
    );
}

export default ProtocolList;