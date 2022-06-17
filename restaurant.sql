create database restaurant;

create user 'restaurant_user'@'localhost' IDENTIFIED with mysql_native_password BY 'industry22';

GRANT ALL ON restaurant.* to 'restaurant_user'@'localhost';

use restaurant;