import React from 'react';

const styles = {
    fieldset: {
        width : '100%',
        minHeight : '70%',
        display: 'inline',
        border: '1px solid rgba(0, 0, 0, .4)',
        padding: '10px',
        margin : '40px 0px'
    },
    legend: {
        width: 'auto',
        marginLeft: '5px',
        padding: '0 10px',
        fontSize: '20px'
    }
}

const Fieldset = props => {
    return (
        <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>{props.title}</legend>
            {props.children}
        </fieldset>
    );
};
 
export default Fieldset;