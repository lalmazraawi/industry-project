import React, { useState } from "react"
import { Table, Pagination } from "react-bootstrap"
import moment from "moment"


const Results = (props) => {
    const {
        foundTransactions,
        metricDefinitions
    } = props

    const [page, setPage] = useState(1)

    let active = 1;
    let items = [];
    let numberOfPages = Math.ceil(foundTransactions.length / 20)
    for (let i = 1; i <= numberOfPages; i++) {
        items.push(
            <Pagination.Item 
                value={i} 
                key={i} 
                active={i === active} 
                onClick={(event)=> {setPage(event.target.attributes.value.value)}}>{i}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            {foundTransactions.length ? <Pagination>{items}</Pagination> : null }
            <Table bordered striped style={{ fontSize: 12 }}>
                <thead>
                    <tr className='lh-1'>
                        <th>Restaurant Name:</th>
                        <th>Transaction Date:</th>
                        <th>Transaction Time:</th>
                        <th>Ticket Number:</th>
                        {metricDefinitions.map((def) => {
                            return(
                                <th key={def.Id}>{def.Alias}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {foundTransactions
                        .slice(((page*20)-20), (page*20))
                        .map((transaction, i) => {
                        return(
                            <tr key={i} className='lh-1'>
                                <td>{transaction.restaurant.Name}</td>
                                <td>{transaction.BusDt}</td>
                                <td>{moment(transaction.OrderTime).format('HH:mm:ss')}</td>
                                <td>{transaction.OrderNumber}</td>
                                <td>${transaction.TotalAmount.toFixed(2)}</td>
                                <td>${transaction.NetAmount.toFixed(2)}</td>
                                <td>{transaction.ItemSoldQty}</td>
                                <td>{transaction.BeverageQty}</td>
                                <td>{transaction.DiscountAmount}</td>
                                <td>%{transaction.DiscountRatio}</td>
                                <td>${transaction.ItemDeletedAmount.toFixed(2)}</td>
                                <td>${transaction.RefundAmount.toFixed(2)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )

}

export default Results