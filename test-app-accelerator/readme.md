# Accelerator App test assignment

## Setup

- Copy `.env.dist` into `.env`
  - if necessary, edit `DATABASE_URL` value
  - /!\ WARNING: do not put quotes on your value, to avoid any Prisma error

- Launch the app (if you want the logs, remove `-d` option):

```cli
docker-compose up -d
```

- Go on localhost:4000 to access the queries playground

## Goals

In this test, you want to see your ability to manipulate transactions like data in aggregation and reporting.

This take-home is meant to be a POC rather than a full fledge project but one that demonstrates your understanding of data storing, retrieving, and aggregation in an effective manner.

## Data

- You have a pizza shop with 3 types of pizza:
  - Pepperoni
  - Branco
  - All dressed
  
- You have sold pizza in the past year (2022), and now you need to build a graphQl API to analyze this data. [Here are the assumptions](https://docs.google.com/spreadsheets/d/1byShULmKZCmGqfLSUwh1RWWcEUPgZq3FRwYHJpV1ZXo/edit?usp=sharing
).

## Queries

- You need to create a graphQL API that will return data with these filters:
  - time: (period start date, end date) or per selected calendar month
  - selected pizza(s) or all pizza

- You should be able to query the following information through the above filters:
  - unit sold
  - ingredients used
  - Cost of ingredients
  - Sales

## API

- The front-end team needs an API that will return the data in total for the selected period and in increments of weeks to display the data in graphs that displays the number per week.

## Technical specifications

- You should use whichever database you want
- use Typescript with whatever library you want.
- The application should be Dockerized.

Once completed, paste the link of your GitHub repo (publicly open) in the form accessible by the button below.

## Tests

BONUS: add an integration test on a query.

## Implementation choices

### Data handling

- The choice has been made to transform the .csv data into .json. Since the data set was small, and the main goal was to build a GraphQL POC, the transformation was handled by hand, to simplify the import and not waste some time into parsing.
- If this POC were to be used in production, a parser should be added via the library xxx to automate the data import.

## Add UUID

x

## Date
Not graphql-iso-date because not updated
// TODO: change the date format (from timestamp to readable string). For now, must be handled by the front

## Archi

SImple for now but may need reflexion
cf https://jaredgorski.org/writing/designing-a-graphql-server/

## Queries

- getPizzas
  - filtered by
    - [id1, id2...]
    - time: (period start date, end date) or per selected calendar month
    - orders
    - recipe (ingredients used)
    -   - Cost of ingredients
    - default: all
- getPizza
  - filtered by
    - id
    - name
    - time: (period start date, end date) or per selected calendar month
    - orders
    - recipe (ingredients used)
    -   - Cost of ingredients
- getOrders
  - filtered by
    - time: (period start date, end date) or per selected calendar month

- todo: group recipe because it appears at each order
- todo: add type input
- 
 You need to create a graphQL API that will return data with these filters:
  - time: (period start date, end date) or per selected calendar month
  - selected pizza(s) or all pizza

- You should be able to query the following information through the above filters:
  - unit sold
  - ingredients used
  - Cost of ingredients
  - Sales

## API

- The front-end team needs an API that will return the data in total for the selected period and in increments of weeks to display the data in graphs that displays the number per week.

build not comoile graphql file