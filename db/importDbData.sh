#!/bin/bash


mongoimport --host localhost --collection customer --db makkris --file json/customer.json
mongoimport --host localhost --collection accounts --db makkris --file json/accounts.json
mongoimport --host localhost --collection event --db makkris --file json/event.json
mongoimport --host localhost --collection resources --db makkris --file json/resources.json