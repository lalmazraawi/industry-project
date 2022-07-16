import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Form, FloatingLabel, Button, Row, Col, Container } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import moment from "moment";
import Results from "./Results"
import Select from 'react-select'
import MetricSelector from "./MetricSelector";

const FilterInput = () => {

  const [metricDefinitions, setMetricDefinitions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [fromHour, setFromHour] = useState(6);
  const [toHour, setToHour] = useState(29);
  const [dates, setDates] = useState({
      fromDate: moment("2021-03-31"),
      toDate: moment("2021-04-02")
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [metrics, setMetrics] = useState([])
  const [foundTransactions, setFoundTransactions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    const fetchMetricDefinitions = async () => {
      let {data} = await axios.get('http://localhost:1337/metricDefinition')
      setMetricDefinitions(data)
    }

    fetchMetricDefinitions()
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

  const submitForm = () => {
    const initialFormData = {
      restaurantIds: selectedOption.map((op) => { return op.value }), // array
      fromDate: dates.fromDate, // date string in format YYYY-MM-DD
      toDate: dates.toDate, // date string in format YYYY-MM-DD
      fromHour: fromHour, // integer (min value is 6, max value is 29)
      toHour: toHour, // integer (min value is 6, max value is 29)
      metricCriteria: [...metrics]
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

  let restaurantOptions = []
  for (let i = 0; i < restaurants.length; i++) {
    restaurantOptions.push({ value: restaurants[i].Id, label: restaurants[i].Name })
  }

  return (
    <div className='m-5'> 
      <Container className='border p-4'> 
        <Form>
          <Row>
            <div>
              <Select
                defaultValue={selectedOption}
                options={restaurantOptions}
                onChange={setSelectedOption}
                isMulti={true}
                className="mb-4"
              />
            </div>
          </Row>
          <Row className="mb-4">
            <Col>
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
            </Col>
            <Col className="col-3">
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
            <Col className="col-3">
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
            <MetricSelector metricDefinitions={metricDefinitions} setMetrics={setMetrics}/>
          </Row>
          </Form>
        <div className="mb-4">
          <Button type="button" variant='primary' onClick={() => submitForm()}>Submit</Button>
        </div>
      </Container> 
      <Container className='border p-4 mt-5 overflow-auto'>
        <Results foundTransactions= {foundTransactions} metricDefinitions= {metricDefinitions}/>
      </Container>
    </div> 
  )
}

export default FilterInput
