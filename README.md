# industry-project
Group Projecth

Inputs
The set of inputs should be the following:

1. RestaurantId selector (List of Ids from 1-10)

2. Date range picker (Some sort of calendar input for a date range)
a. Two calendars – one for FromDate and one for ToDate

3. Transaction time picker (The default should be between 6am to 5am next day with the option to change it in hourly increments)
a. Two pickers – one for FromHour and for ToHour

4. Metric criteria inputs
a. User should be able to pick a metric from a given list (from the list of metric codes available in Metric Definitions from the API)
b. Then select a measure (<=, <, =, >, >=)
c. Compare it to a numerical value

The format of the restaurant data is the following
Restaurant ID, Transaction date, Transaction time , Ticket number,  Transaction total amount$, Transaction net amont$, Item sold#, Bev. sold #, Transaction discount amount $, Transaction discount ratio %, Item deleted amount $, Transaction refund amount$


