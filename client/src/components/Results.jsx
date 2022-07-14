import React, { useState } from "react"
import { Table, Pagination } from "react-bootstrap"


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
            <Table bordered striped>
                <thead>
                    <tr>
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
                            <tr key={i}>
                                <td>{transaction.restaurant.Name}</td>
                                <td>{transaction.BusDt}</td>
                                <td>{transaction.OrderTime}</td>
                                <td>{transaction.OrderNumber}</td>
                                <td>${transaction.TotalAmount}</td>
                                <td>${transaction.NetAmount}</td>
                                <td>{transaction.ItemSoldQty}</td>
                                <td>{transaction.BeverageQty}</td>
                                <td>{transaction.DiscountAmount}</td>
                                <td>%{transaction.DiscountRatio}</td>
                                <td>${transaction.ItemDeletedAmount}</td>
                                <td>${transaction.RefundAmount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )

}

export default Results