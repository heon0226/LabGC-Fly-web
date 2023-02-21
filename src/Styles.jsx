export const LAYOUT = {
    width: '80%',
    border: '1px solid rgba(0, 0, 0, .4)',
    display: 'flex',
    margin: '5% auto',
    padding: '10px',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'whitesmoke'
};

export const FIELDSET = {
    display: 'inline',
    border: '1px solid rgba(0, 0, 0, .4)',
    padding: '10px',
    margin: '40px 0px'
};

export const LEGEND = {
    width: 'auto',
    marginLeft: '5px',
    padding: '0 10px',
    fontSize: '20px'
};
export const LABEL = {
    fontSize: '16px',
    fontFamily: 'Consolas, sans-serif',
    margin : '5px auto auto auto',
    minHeight : '25px'
}

export const LABEL_BORDERD = {
    fontSize: '16px',
    fontFamily: 'Consolas, sans-serif',
    border: "1px solid rgba(0, 0, 0, .4)",
    margin : '5px auto',
    minWidth : '50px',
    minHeight : '25px',
    textAlign :'center'

}

export const RESULT_TABLE = {
    width : '90%',
    margin : 'auto',
    textAlign : 'center',
    border : '1px solid rgba(0, 0, 0, .4)',
    fontFamily: 'Consolas, sans-serif',
    tableLayout : 'fixed'
}

export const RESULT_TABLE_ITEM = {
    emptyCells : 'show',
    border : '1px solid rgba(0, 0, 0, .4)',
    fontFamily: 'Consolas, sans-serif',
}
export const RESULT_TABLE_ITEM_WHITH = {
    emptyCells : 'show',
    border : '1px solid rgba(0, 0, 0, .4)',
    fontFamily: 'Consolas, sans-serif',
    backgroundColor : 'white'
}

export const TEXTAREA = {
    resize: 'none',
    outline: 'none',
    fontSize: '16px',
    fontFamily: 'Consolas, sans-serif',
    width: '100%',
    border: '1px solid rgba(0, 0, 0, .4)'
};

export const BUTTON = {
    border: '1px solid rgba(0, 0, 0, .3)',
    width: '100px',
    margin: '10px',
    outlineColor: 'rgba(0, 0, 0, .4)',
};


export const FILTER_FORM = {
    margin: 'auto 10px'
}

export const FILTER_LABEL = {
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'Consolas, sans-serif',
    margin: 'auto',
};

export const FILTER_IMAGE = {
    border: "1px solid #adadad",
    backgroundColor: "#e1e1e1",
    textAlign: "center",
    padding: "5px",
    margin: '5px 10px'
};

export const FILTER_INPUT = {
    width: '80px',
    height: '30px',
    padding: '3px',
    margin: '5px 0px',
    outline: 'none'
};

export const EDITOR_LABEL = {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '500',
    margin: 'auto 1px'
};

export const EDITOR_INPUT = {
    height: '30px',
    fontSize: '0.8em',
    fontWeight: '600',
    fontFamily: 'Consolas, sans-serif',
    padding: '2px',
    margin: 'auto 10px',
    outline: 'none'
};

export const EDITOR_BOX = {
    display: 'inline',
    margin: 'auto 10px'
};

export const HISTORY_TABLE = {
    height: '10px',
    overflowY: 'scroll',
};

export const HISTORY_TBODY = {
    backgroundColor: 'white'
};


export const LAYOUT_GRAPH = {
    showLegend: true,
    xaxis: {
        rangemode: 'tozero',
        title: "PCR Cycles",
    },
    yaxis: {
        rangemode: 'nonnegative',
        title: "Sensor Value",
        range: [0, 4096]
    }
};


export const LAYOUT_TEMP = {
    showLegend: true,
    xaxis: {
        rangemode: 'tozero',
        title: "Time",
    },
    yaxis: {
        rangemode: 'tozero',
        title: "Temperture",
    }
};

export const HISTORY_PLOT = {
    height: '30rem',
};

export const PLOT = {
    width: '100%',
    height: '100%'
};

export const VERTIAL_CENTER = {
    display : 'flex',
    verticalAlign : 'center'
}