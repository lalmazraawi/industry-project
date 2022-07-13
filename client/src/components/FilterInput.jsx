import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Form, FloatingLabel, Button, Row, Col } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import moment from "moment";
import Results from "./Results"

const FilterInput = () => {

  const [metricDefinitions, setMetricDefinitions] = useState([]);
  const [restaurantIds, setRestaurantIds] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [fromHour, setFromHour] = useState(6);
  const [toHour, setToHour] = useState(29);
  const [dates, setDates] = useState({
      fromDate: moment("2021-03-11"),
      toDate: moment("2021-05-11")
  });
  const [focusedInput, setFocusedInput] = useState('startDate');
  const [metricCode, setMetricCode] = useState('')
  const [compareType, setCompareType] = useState('')
  const [compareValue, setCompareValue] = useState('')
  const [foundTransactions, setFoundTransactions] = useState([])

  useEffect(() => {
    const fetchMetricDefintions = async () => {
      let {data} = await axios.get('http://localhost:1337/metricDefinition')
      setMetricDefinitions(data)
    }

    fetchMetricDefintions ()
    .catch(console.error);

  }, [])

  useEffect(() => {
    const fetcheRestaurants = async () => {
      let {data} = await axios.get('http://localhost:1337/restaurants')
      setRestaurants(data)
    }

    fetcheRestaurants()
      .catch(console.error);
    }, [])

  const restaurantCheckboxChanged = (id) => {
    const newId = restaurantIds.find((restaurantId) => {
      return (restaurantId === id)
    });

    const newArray = [];
    if (!newId) {
      for (let i = 0; i < restaurantIds.length; i++) {
        newArray[i] = restaurantIds[i];
      }
      newArray.push(id);

      setRestaurantIds(newArray);
    } else {
      for (let i = 0; i < restaurantIds.length; i++) {
        if (restaurantIds[i] !== id) {
          newArray.push(restaurantIds[i]);
        }  
      }

      setRestaurantIds(newArray);
    }
  }

  const submitForm = () => {
    const initialFormData = {
      restaurantIds: restaurantIds, // array
      fromDate: dates.fromDate, // date string in format YYYY-MM-DD
      toDate: dates.toDate, // date string in format YYYY-MM-DD
      fromHour: fromHour, // integer (min value is 6, max value is 29)
      toHour: toHour, // integer (min value is 6, max value is 29)
      metricCriteria: [{
        metricCode: metricCode, // string (comes from a list of metric codes in Metric Definitions)
        compareType: compareType, // string - one of the compare type options
        value: Number(compareValue) // decimal (numerical value)
      }] // array of metric criteria
    };

    const fetchTransactions = async () => {
      let transactionData = await axios.post('http://localhost:1337/search', initialFormData)
      setFoundTransactions(transactionData.data)
    }
    fetchTransactions()
      .catch(console.error);
  }

  const hours = []
  for (let i = 6; i < 30; i++) {
    hours.push(i)
  }

  const compareTypes = [
    { value: 'LessThan', text: '<' },
    { value: 'LessThanOrEqual', text: '<=' },
    { value: 'Equal', text: '=' },
    { value: 'GreaterThan', text: '>' },
    { value: 'GreaterThanOrEqual', text: '>=' }
  ]

  return (
    <div>   
      <Form>
        <Row>
          <div>
            {restaurants.map((restaurant, index) => (
              <div key={index}>
                <Form.Check
                  type={'checkbox'}
                  label={restaurant.Name}
                  onChange={() => restaurantCheckboxChanged(restaurant.Id)}
                />
              </div>))}
          </div>
        </Row>
        <Row className="mb-4">
          <DateRangePicker
              isOutsideRange={() => false}
              startDate={dates.fromDate} // momentPropTypes.momentObj or null,
              startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
              endDate={dates.toDate} // momentPropTypes.momentObj or null,
              endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
              onDatesChange={({ startDate, endDate }) => setDates({ fromDate: startDate, toDate: endDate })} // PropTypes.func.isRequired,
              focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
          />
        </Row>
        <Row className="mb-4">
          <Col>
            <div>
              <FloatingLabel label='From Hour:'>
                <Form.Select onChange={(event) => setFromHour(event.target.value) }>
                  {hours.map((hour) => (
                    <option value={hour} key={hour}>{hour}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </div>
          </Col>
          <Col>
            <div>
              <FloatingLabel label='To Hour:'>
                <Form.Select defaultValue='29' onChange={(event) => setToHour(event.target.value) }>
                  {hours.map((hour) => (
                    <option value={hour} key={hour}>{hour}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
            <Col>
              <FloatingLabel label='Metric:'>
                  <Form.Select onChange={(event) => setMetricCode(event.target.value)}>
                      {metricDefinitions.map((def) => (
                          <option value={def.MetricCode} key={def.MetricCode}>{def.Alias}</option>
                      ))}
                  </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label='Compare Type:'>
                  <Form.Select onChange={(event) => setCompareType(event.target.value)}>
                      {compareTypes.map((compareType) => (
                          <option value={compareType.value} key={compareType.value}>{compareType.text}</option>
                      ))}
                  </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label='Compare Value:'>
                <Form.Control type='number' onChange={(event) => setCompareValue(event.target.value)}/>
              </FloatingLabel>
            </Col>
        </Row>
      </Form>
      
      <Button type="button" variant='primary' onClick={() => submitForm()}>Submit</Button>
      <Results foundTransactions= {foundTransactions} metricDefinitions= {metricDefinitions}/>
      
    </div> 
  )
}



export default FilterInput

