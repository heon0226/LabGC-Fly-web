import React from 'react';
import { Row, Col  } from 'react-bootstrap';
const styles = {
    form: {
        margin: 'auto 10px'
    },
    text: {
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: 'Consolas, sans-serif',
        margin: 'auto'
    },
    image: {
        border: "1px solid #adadad",
        backgroundColor: "#e1e1e1",
        textAlign: "center",
        padding: "5px",
        margin: '5px 10px'
    },
    input: {
        width: '80px',
        height: '30px',
        padding: '3px',
        margin: '5px 0px',
        outline: 'none'
    },



}
const FilterForm = props => {
    const getFilterImage = () => {
        const publicUrl = process.env.PUBLIC_URL;
        if (props.filter) {
            switch (props.filterType) {
                case 'FAM':
                    return  publicUrl + '/static/img/fam.bmp';
                case 'HEX':
                    return  publicUrl + '/static/img/hex.bmp';
                case 'ROX':
                    return  publicUrl + '/static/img/rox.bmp';
                case 'CY5':
                    return  publicUrl + '/static/img/cy5.bmp';
                default:
                    return  publicUrl + '/static/img/off.bmp';
            }
        } else {
            return  publicUrl + '/static/img/off.bmp'; 
        }
        
    }


    return (
        <Col ms='auto' xs='auto' style={styles.form}>
            <Row >
                <span style={styles.text}>{props.filterType}</span>
                <input type='text' style={styles.input} name={props.filterType}
                    value={props.filterName} onChange={props.filterNamesHandler}
                    disabled={!props.filter} />
            </Row>

            <Row>
                <img style={styles.image} name={props.filterType}
                    src={getFilterImage()} onClick={props.filtersHandler} />
                <input type='number' min="0" style={styles.input} name={props.filterType}
                    value={props.filterCt} onChange={props.filterCtsHandler}
                    disabled={!props.filter} />
            </Row>
        </Col>
    );

};

export default FilterForm;