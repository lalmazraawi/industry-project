import React from "react"
import { Table } from "react-bootstrap"


const Results = (props) => {
    const {
        foundTransactions,
        metricDefinitions
    } = props
    
    return (<div>
        
        <Table bordered striped>
            <thead>
                <tr>
                    <th>Restaurant Name:</th>
                    <th>Transaction Date:</th>
                    <th>Transaction Time:</th>
                    <th>Ticket Number:</th>
                    {metricDefinitions.map((def) => {
                        return(
                            <th>{def.Alias}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {foundTransactions.map((transaction) => {
                    return(
                        <tr>
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