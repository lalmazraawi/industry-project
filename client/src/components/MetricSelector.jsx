import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap'

const MetricSelector = (props) => {
  const { metricDefinitions, setMetrics } = props

  const [buttonClicks, setButtonClicks] = useState([0])
  const [metricsArray, setMetricsArray] = useState([{ metricCode: '', compareType: '', value: 0 }])

  useEffect(() => {
    setMetrics(metricsArray)
  })

  const compareTypes = [
    { value: 'LessThan', text: '<' },
    { value: 'LessThanOrEqual', text: '<=' },
    { value: 'Equal', text: '=' },
    { value: 'GreaterThan', text: '>' },
    { value: 'GreaterThanOrEqual', text: '>=' }
  ]

  const addMetricCode = (value, index) => {
    setMetricsArray((prevArray) => {
      prevArray[index].metricCode = value
      return [...prevArray]
    })
  }

  const addCompareType = (value, index) => {
    setMetricsArray((prevArray) => {
        prevArray[index].compareType = value
        return [...prevArray]
    })
  }

  const addCompareValue = (value, index) => {
    setMetricsArray((prevArray) => {
      prevArray[index].value = value
      return [...prevArray]
    })
  }

  const handleAddMetric = () => {
    setButtonClicks((prevButtonClicks) => [...prevButtonClicks, prevButtonClicks.length])
    setMetricsArray((prevMetricsArray) => [...prevMetricsArray, { metricCode: '', compareType: '', value: 0 }])
  }

  const handleDeleteMetric = () => {
    if (buttonClicks.length > 1) {
      setButtonClicks((prevButtonClicks) => [...prevButtonClicks.slice(0, prevButtonClicks.length - 1)])
      setMetricsArray((prevMetricsArray) => {
          prevMetricsArray.splice(buttonClicks.length - 1, 1)
          return prevMetricsArray
      })
    }
  }

  return (
    <div>
      <Row className="mb-4">
        <Col className="col-md-auto">
          <Button 
            type="button" 
            variant='primary' 
            onClick={() => { handleAddMetric() }}>Add Filter</Button>
        </Col>
        <Col>
          <Button
            type="button"
            variant='primary'
            onClick={() => { handleDeleteMetric() }}>Remove Filter</Button>
        </Col>
      </Row>
      {buttonClicks.map((i, index) => {
        return (
          <Row key={i} className="mb-4">
            <Col>
              <FloatingLabel label='Metric:'>
                <Form.Select onChange={(event) => addMetricCode(event.target.value, index)}>
                  <option value=''></option>
                  {metricDefinitions.map((def) => (<option value={def.MetricCode} key={def.MetricCode}>{def.Alias}</option>))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label='Compare Type:'>
                <Form.Select onChange={(event) => addCompareType(event.target.value, index)}>
                  {compareTypes.map((compareType) => (<option value={compareType.value} key={compareType.value}>{compareType.text}</option>))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label='Compare Value:'>
                <Form.Control type='number' onChange={(event) => addCompareValue(event.target.value, index)} />
              </FloatingLabel>
            </Col>
          </Row>
        )
      })}
    </div>
  )
}

export default MetricSelector