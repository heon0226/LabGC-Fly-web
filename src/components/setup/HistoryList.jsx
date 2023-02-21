import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { HISTORY_TABLE, HISTORY_TBODY } from '../../Styles';
import HistoryModal from './HistoryModal';

const HISTORY = {
    height: '250px',
    overflowY: 'scroll'
}

const ITEM = {
    fontFamily: 'Consolas, sans-serif',
}



const initialHistory = { id: -1, date: '', target: '', filter: '', ct: '', result: '' }

const HistoryList = props => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(initialHistory);

    const showHistory = (event, index) => {
        setSelectedHistory(props.histories[index]);
        setIsShowModal(true);
    }

    const onHide = () => {
        setIsShowModal(false);
    };
    return (
        <Col style={HISTORY}>
            <Table hover bordered size='sm' style={HISTORY_TABLE}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Date Time</th>
                        <th>Target</th>
                        <th>Filter</th>
                        <th>CT Value</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody style={HISTORY_TBODY}>
                    {
                        props.histories.map(
                            (history, index) => {
                                return (
                                    <tr key={index}
                                        onClick={event => showHistory(event, index)}>
                                        <td style={ITEM}>{'#' + index}</td>
                                        <td style={ITEM}>{history.date}</td>
                                        <td style={ITEM}>{history.target.join(', ')}</td>
                                        <td style={ITEM}>{history.filter.join(', ')}</td>
                                        <td style={ITEM}>{history.ct.join(', ')}</td>
                                        <td style={ITEM}>{history.result.join(', ')}</td>
                                    </tr>
                                );
                            }
                        )
                    }

                </tbody>
                <HistoryModal
                    onHide={onHide}
                    history={selectedHistory}
                    show={isShowModal} />

            </Table>
        </Col>

    );
}

export default HistoryList;