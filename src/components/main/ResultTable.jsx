import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { RESULT_TABLE, RESULT_TABLE_ITEM, RESULT_TABLE_ITEM_WHITH } from '../../Styles';


const ResultTable = props => {

    const [tableItems, setTableItems] = useState([{}, {}, {}, {}]);
    // const filterNames = JSON.parse(props.filterNames);

    useEffect(() => {
        const results = props.results.filter(result => result);
        const filterNames = props.filterNames.filter(filterName => filterName);

        filterNames.forEach(
            (filterName, index) => {
                tableItems[index].name = filterName;
                tableItems[index].result = results[index] ? results[index] : '';

            }
        );

    }, [props.results, props.filterNames])


    return (
        <Col>
            <table style={RESULT_TABLE}>
                <thead>
                    <th style={RESULT_TABLE_ITEM}>Target</th>
                    <th style={RESULT_TABLE_ITEM}>Result</th>
                </thead>
                <tbody>
                    {
                        tableItems.map(
                            (tableItem, index) => {
                                return (
                                    <tr key={index} style={RESULT_TABLE_ITEM}>
                                        <td style={RESULT_TABLE_ITEM}>&nbsp;{tableItem.name ? tableItem.name : ''}&nbsp;</td>
                                        <td style={RESULT_TABLE_ITEM_WHITH}>&nbsp;{tableItem.result ? tableItem.result : ''}&nbsp;</td>
                                    </tr>
                                );
                            }
                        )
                    }

                </tbody>
            </table>
        </Col>
    );
}


export default ResultTable;