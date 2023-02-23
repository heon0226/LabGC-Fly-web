import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../components/Layout';
import Fieldset from '../components/Fieldset';

import TextArea from '../components/editor/Textarea';
import FilterForm from '../components/editor/FilterForm';

import { PROTOCOL_LIST, PROTOCOL_CHECK, PROTOCOL_CREATE, PROTOCOL_EDIT } from '../API';
import { Row, Col, Container } from 'react-bootstrap';

const styles = {
    text: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: '500',
        margin: 'auto 0px'
    },
    input: {
        height: '30px',
        fontSize: '0.8em',
        fontWeight: '600',
        fontFamily: 'Consolas, sans-serif',
        padding: '2px 5px',
        margin: 'auto 20px auto 0px',
        outline: 'none'
    },
    button: {
        border: '1px solid rgba(0, 0, 0, .3)',
        width: '100px',
        margin: '20px 30px',
        outlineColor: 'rgba(0, 0, 0, .4)',
    },
    form: {
        display: 'inline',
        margin: 'auto 10px'
    },

}

const Editor = props => {
    const history = useHistory();
    const filterTypes = ['FAM', 'HEX', 'ROX', 'CY5']; // filter Type list
    const isEditMode = props.match.params.name !== 'new'; // check edit protocol mode state

    const [eventFlag, setEventFlag] = useState(false);
    const [protocolID, setProtocolID] = useState(-1);   // protocol id state
    const [protocolName, setProtocolName] = useState(''); // protocol name state
    const [pcrProtocol, setPcrProtocol] = useState('');  // pcr protocol state
    const [magnetoProtocol, setMagnetoProtocol] = useState(''); // magneto protocol state
    const [filters, setFilters] = useState([true, true, true, true]);  // filter on & off state 
    const [filterCts, setFilterCts] = useState([38, 38, 38, 38]); // CT value list state
    const [filterNames, setFilterNames] = useState(['', '', '', '']);// filter name list state


    const convertPcrProtocol = (protocol) => {
        const lines = [];
        protocol.forEach((line) => {
            const label = line.label;
            const temp = Number(line.temp).toFixed(0);
            const time = line.time;
            if (label == 'SHOT') 
                lines.push(label)
            else 
                lines.push([label, temp, time].join('\t'))
        });

        return lines.join('\r\n');
    };

    const convertFilters = (filters, filterNames, filterCts) => {

        const tempFilters = [false, false, false, false];
        const tempFilterNames = ['', '', '', ''];
        const tempFilterCts = [38, 38, 38, 38];

        if (filters.lenght !== 4) {
            filters.forEach(
                (filter, index) => {
                    const filterIndex = filterTypes.findIndex(filterType => filterType === filter);
                    tempFilters[filterIndex] = true;
                    tempFilterNames[filterIndex] = filterNames[index];
                    tempFilterCts[filterIndex] = filterCts[index];
                }
            )
        }

        return { filters: tempFilters, filterNames: tempFilterNames, filterCts: tempFilterCts };
    };

    // filters state event handler function
    const filtersHandler = event => {
        const name = event.target.name;
        setFilters(
            filters.map(
                (filter, index) => filterTypes[index] === name ? !filter : filter
            )
        );
    }

    // filterCts state event handler function
    const filterCtsHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        setFilterCts(
            filterCts.map(
                (filterCt, index) => filterTypes[index] === name ? value : filterCt
            )
        );
    }

    // filterNames state event handler function
    const filterNamesHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        setFilterNames(
            filterNames.map(
                (filterName, index) => filterTypes[index] === name ? value : filterName
            )
        );
    }

    // load protocol data using protocol name (call protocol list api)
    const getProtocol = name => {
        fetch(PROTOCOL_LIST, { method: 'POST' })
            .then(response => response.json())
            .then(response => response.protocols.filter(
                (protocol) => protocol.name === name)[0])
            .then(protocol => {
                // TODO : split protocol text and filter values
                setProtocolID(protocol.id ? protocol.id : -1);
                setProtocolName(protocol.protocolName);
                setPcrProtocol(convertPcrProtocol(JSON.parse(protocol.protocol)));

                setMagnetoProtocol(JSON.parse(protocol.magnetoProtocol).join('\r\n'));

                const { filters, filterNames, filterCts } = convertFilters(protocol.filters.split(', '),
                    protocol.filterNames.split(', '),
                    protocol.filterCts.split(', '));

                setFilters(filters);
                setFilterNames(filterNames);
                setFilterCts(filterCts);
            });
    }

    // call check protocol api 
    const checkProtocol = () => {
        // TODO : call check protocol api
    };

    // call create or edit protocol api
    const saveProtocol = event => {
        // TODO : call editProtocol or newProtocol api 
        setEventFlag(true); // disabled click event 

        const protocol = []; // protocol text lines
        const tempFilters = []; // filters line   
        const tempFilterNames = []; // filter names line
        const tempFilterCts = [];  // filter CT Values line

        filters.forEach((filter, index) => {
            if (filter) {
                tempFilters.push(filterTypes[index]);
                tempFilterNames.push(filterNames[index].trim());
                tempFilterCts.push(filterCts[index]);
            }
        });

        protocol.push(isEditMode ? protocolID : protocolName);
        protocol.push(tempFilters.join(', ').trim());
        protocol.push(tempFilterNames.join(', ').trim());
        protocol.push(tempFilterCts.join(', ').trim());
        // protocol.push(pcrProtocol.trim());
        pcrProtocol.split('\n').forEach(line => protocol.push(line.trim()))
        protocol.push('#');
        // protocol.push(magnetoProtocol.trim());
        magnetoProtocol.split('\n').forEach(line => protocol.push(line.trim()))

        
        fetch(isEditMode ? PROTOCOL_EDIT : PROTOCOL_CREATE,
            {
                method: 'POST',
                headers: { "Content-Type": "text/plain" },
                body: protocol.join('\r\n').toString()
            })
            .then(response => response.json())
            .then(response => {
                if (response.result === 'ok') {
                    history.replace('/setup');
                } else {
                    alert(response.reason);
                }
            });

        setEventFlag(false) // enabled click event

    }

    //  cancel create or edit task and return setup page 
    const cancelProtocol = () => {
        // TODO : route setup page
        history.replace('/setup');
    }

    // state life cycle function 
    useEffect(() => {
        // component did mount
        if (isEditMode) {
            const name = decodeURIComponent(props.match.params.name);
            getProtocol(name);
            setProtocolName(name);
        }
    }, [])


    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md='auto'>
                    {/* Filter Forms */}
                    <Fieldset title='Filter(Label, CT)'>
                        <Row className="justify-content-center">
                            {
                                filterTypes.map(
                                    (filterType, index) => {
                                        return (
                                            <FilterForm
                                                key={index}
                                                filter={filters[index]}
                                                filterType={filterType}
                                                filterName={filterNames[index]}
                                                filterCt={filterCts[index]}
                                                filtersHandler={filtersHandler}
                                                filterCtsHandler={filterCtsHandler}
                                                filterNamesHandler={filterNamesHandler}
                                            />
                                        );
                                    }
                                )
                            }
                        </Row>
                    </Fieldset>
                </Col>
                <Col lg={4} md={3} style={styles.form}>
                    <Row className="justify-content-center">

                        <Col md='auto' xs='5' style={styles.text} >Protocol Name :</Col>
                        <Col md='auto' xs='5' as="input" type='text' style={styles.input}
                            onChange={event => setProtocolName(event.target.value)} value={protocolName}
                            disabled={isEditMode} />

                        <Col lg='auto' md='auto' xs='12' >
                            <button style={styles.button} onClick={saveProtocol} disabled={eventFlag}>Save</button>
                            <button style={styles.button} onClick={cancelProtocol}>Cancel</button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* pcr and magneto protcool textarea */}
            <Row className="justify-content-center">
                <Col lg='6' md='5' sm={4}>
                    <Fieldset title="PCR Protocol">
                        <TextArea
                            protocol={pcrProtocol}
                            handler={event => setPcrProtocol(event.target.value)} />
                    </Fieldset>
                </Col>
                <Col lg='6' md='5' sm={4}>
                    <Fieldset title="Magneto Protocol">
                        <TextArea
                            protocol={magnetoProtocol}
                            handler={event => setMagnetoProtocol(event.target.value)} />
                    </Fieldset>
                </Col>
            </Row>

        </Container>
    );
}


export default Editor;