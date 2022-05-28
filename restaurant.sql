create database restaurant;

create user 'restaurant_user'@'localhost' IDENTIFIED with mysql_native_password BY 'industry22';

GRANT ALL ON restaurant.* to 'restaurant_user'@'localhost';

use restaurant;

create table restaurants (
Id INT NOT NULL,
Name VARCHAR(45),
Address VARCHAR(255),
City VARCHAR(255),
State VARCHAR(255),
Zipcode VARCHAR(15),
 PRIMARY KEY(Id));
 
 desc restaurants;
 
create table transactions (
RestaurantId INT NOT NULL,
BusDt VARCHAR(255),
OrderNumber INT,
OrderTime VARCHAR(255),
TotalAmount DECIMAL(4, 2),
NetAmount DECIMAL(4, 2),
ItemSoldQty INT,
BeverageQty INT,
DiscountAmount DECIMAL(4, 2),
DiscountRatio DECIMAL(25, 25),
ItemDeletedAmount DECIMAL(4, 2),
RefundAmount DECIMAL(4, 2),
PRIMARY KEY (RestaurantId)
);

desc transactions;

create table metrics (
Id INT NOT NULL,
MetricCode VARCHAR(255),
Alias VARCHAR(60) NOT NULL,
DataType VARCHAR(255),
DecimalPlaces INT NOT NULL,
Primary KEY (Id));

desc metrics;

INSERT into restaurants ( Id, Name, Address, City, State, Zipcode) values (  1, "Restaurant 1 - Greystone", "8553 Greystone Street", "Cantonment", "FL", "32533" );

INSERT into transactions (RestaurantId, BusDt, OrderNumber, OrderTime, TotalAmount, NetAmount, ItemSoldQty, BeverageQty, DiscountAmount, DiscountRatio, ItemDeletedAmount, RefundAmount) 
values (  1, "2021-04-01T00:00:00", 39, "2021-04-01T06:04:00", 7.94, 7.38, 2, 0, 0.0, 0, 0.0, 0.0);

INSERT into metrics ( Id, MetricCode, Alias, DataType, DecimalPlaces) values ( 1, "TotalAmount", "Transaction Total Amount $", "Money", 2);


