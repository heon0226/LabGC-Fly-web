import React from 'react';

const styles = {
    textarea: {
        resize: 'none',
        outline: 'none',
        fontSize: '16px',
        padding : '5px 10px',
        fontFamily: 'Consolas, sans-serif',
        width : '100%',
        border : '1px solid rgba(0, 0, 0, .4)'
    }
}

// Event KeyCode 
const TAB_CODE = 9;
const ENTER_CODE = 13;

// TODO : 정규식으로 문법 검사

const TextArea = props => {
    const keyDownEvent = event => {
        // input key : Tab
        if (event.keyCode === TAB_CODE) {
            event.preventDefault();
            const value = event.target.value;   // text value
            const start = event.target.selectionStart; // selection start index
            const end = event.target.selectionEnd;  // selection end index
            event.target.value = value.substring(0, start) + '\t' + value.substring(end);   // insert \t
            event.target.selectionStart = event.target.selectionEnd = start + 1; // set selcetion index
            return false;
        }
        // input key : Enter
        if (event.keyCode === ENTER_CODE) {
            const tempLines = event.target.value.split('\n')        // split by line
            const lines = tempLines.map(line => line.trim());     // remove margins
            event.target.value = lines.join('\n');               // combined by '\n'
        }
    };

    return <textarea
        required
        cols='60'
        // rows='10'
        rows={props.rows || '10'}
        name={props.name}
        index = {0}
        value={props.protocol}
        style={styles.textarea}
        onKeyDown={keyDownEvent}
        onChange={props.handler} />
}

export default TextArea;