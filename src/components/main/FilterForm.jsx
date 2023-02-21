import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FILTER_IMAGE, LABEL_BORDERD, LABEL } from '../../Styles';



const FilterForm = props => {
    const filterTypes = ['FAM', 'HEX', 'ROX', 'CY5'];

    const getFilterImage = () => {
        const publicUrl = process.env.PUBLIC_URL;
        if (props.isShow) {
            switch (props.filter) {
                case 'FAM':
                    return publicUrl + '/static/img/fam.bmp';
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
        <Col md='auto' xs='auto'>
            <Row className="justify-content-center" style={LABEL}> {filterTypes[props.index]} </Row>
            <Row className="justify-content-center">
                <img src={getFilterImage()} style={FILTER_IMAGE} id={props.index} onClick={props.displayHandler} />
            </Row>
            <Row className="justify-content-center" style={LABEL_BORDERD} disabled={props.isShow}>
                &nbsp;
                {props.resultCt ? props.resultCt : ''}
                &nbsp;
            </Row>
        </Col>
    )
}

export default FilterForm;
