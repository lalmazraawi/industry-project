import React, { useState, useEffect } from "react";
import axios from 'axios';

const FilterInput = () => {

    useEffect(() => {
        const initialFormData = {
            restaurantIds: [1,2], // array
            fromDate: "2021-03-11T00:00:00.000Z", // date string in format YYYY-MM-DD
            toDate: "2021-05-11T00:00:00.000Z", // date string in format YYYY-MM-DD
            fromHour: 6, // integer (min value is 6, max value is 29)
            toHour: 29, // integer (min value is 6, max value is 29)
            metricCriteria: [{
                metricCode: "TotalAmount", // string (comes from a list of metric codes in Metric Definitions)
                compareType: "GreaterThan", // string - one of the compare type options
                value: 35 // decimal (numerical value)
            }] // array of metric criteria
        };
        const fetchTransactions = async () => {
            let {data} = await axios.post('http://localhost:1337/search', initialFormData)
            console.log(data)
        }

        fetchTransactions ()

        .catch(console.error);

    }, [])

    useEffect(() => {
            
        const fetchMetricDefintions = async () => {
            let {data} = await axios.get('http://localhost:1337/metricDefinition')
            console.log(data)
        }

        fetchMetricDefintions ()

        .catch(console.error);

    }, [])

    
    
    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            let {data} = await axios.get('http://localhost:1337/restaurants')
            console.log(data)
        }
      
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);
      }, [])



return (
<div> 
<form>
<div>
                <input type="checkbox" aria-label="Checkbox for following text input" />
            <label>Restaurant 1</label>
            </div>

<div class="input-group mb-3">
  <div class="input-group-prepend">
    <div class="input-group-text">
      <input type="checkbox" aria-label="Checkbox for following text input"/>
    </div>
  </div>
  <input type="text" class="form-control" aria-label="Text input with checkbox"/>
</div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Email address</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect2">Example multiple select</label>
    <select multiple class="form-control" id="exampleFormControlSelect2">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Example textarea</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</form>
</div> )
}


export default FilterInput

import React, {useEffect, useState} from "react";



function BootstrapPage() {
    const [restaurants, setRestaurants] = useState([
        {
            id: 1,
            name: "Restaurant 1"
        },
        {
            id: 2,
            name: "Restaurant 2"
        },
        {
            id: 3,
            name: "Restaurant 3"
        },
        {
            id: 4,
            name: "Restaurant 4"
        }
    ]);

    const [restaurantIds, setRestaurantIds] = useState([]);

    

    const restaurantCheckboxChanged = (id) => {
        const newId = restaurantIds.find(restaurantId => {
            return restaurantId === id
        });

        console.log(newId);

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
    };

    const submitForm = () => {
        const formData = {
            restaurantIds: restaurantIds, // array
            fromDate: "2021-4-1", // date string in format YYYY-MM-DD
            toDate: "2021-4-5", // date string in format YYYY-MM-DD
            fromHour: 6, // integer (min value is 6, max value is 29)
            toHour: 29, // integer (min value is 6, max value is 29)
            metricCriteria: [{
                metricCode: "TotalAmount", // string (comes from a list of metric codes in Metric Definitions)
                compareType: "GreaterThan", // string - one of the compare type options
                value: 35 // decimal (numerical value)
            }] // array of metric criteria
        };

        console.log(formData);
    }

    console.log(restaurantIds);

    return (
        <div>
        <form>
            {restaurants.map((restaurant, index) => {
                return (
                    <div key={index}>
                        <input type="checkbox" onChange={() => restaurantCheckboxChanged(restaurant.id)} aria-label="Checkbox for following text input" />
                        <label>{restaurant.name}</label>
                    </div>
                )  
            })};        

            <div class="form-group">
                <label for="exampleFormControlSelect1">Example select</label>
                <select class="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </select>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect2">Example multiple select</label>
                <select multiple class="form-control" id="exampleFormControlSelect2">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </select>
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            
        </form>

        <button type="button" class="btn btn-primary" onClick={() => submitForm()}>Submit</button>
        </div>
    )
}

export default BootstrapPage;

