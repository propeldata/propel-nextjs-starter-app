# Propel NextJS Started App

This Propel NextJS Starter App is a simple web application that demonstrates how to use the Propel GraphQL API to display data visualizations in a web browser.

## Quickstart

For a step-by-step tutorial follow our [quickstart](https://www.propeldata.com/docs/quickstart).

> ⚠️ **If you are using the TacoSoft demo data,**: make sure to provision a P1_MEDIUM Propeller in your Propel Application. The P1_X_SMALL or P1_SMALL Propellers are not sufficient to run the queries on this data set.

## Set up your local development environment

Update the `.env.sample` file with your Propel Application client ID and secret.

```bash
CLIENT_ID=1jb...
CLIENT_SECRET=1og...
```

Rename the `.env.sample` file in the project's root directory to `.env.local`.

```bash
mv .env.sample .env.local
```

You'll find these API keys by navigating to https://console.propeldata.com/applications/, selecting your Propel Application, and looking at the section labeled "OAuth2 client credentials".

Leave the other environment variables that are already present in that file, such as `TOKEN_HOST` and `TOKEN_PATH`.

## Run your local development server

1. Run `yarn` to install dependencies.
2. Run `yarn dev` to launch the local development server.
3. Browse to https://localhost:3000.
4. Select your Metric from the drop-down menu.
5. Choose one of the sample charts, either a time series or counter visualization.

## Edit your GraphQL queries

You can now try editing the \*.graphql files in the /graphql/ directory to change the visualizations. For example, you may want to view data on a month-to-month basis instead of looking at the data from week to week.

To do so, you just need to edit the `granularity: WEEK` statement in the `TimeSeriesQuery.graphql` file to read `granularity: MONTH` instead.

You'll find the granularity setting inside the `metric` portion of the GraphQL call. Open up the `TimeSeriesQuery.graphql` file and look for the following:

```gql
  metric(id: $id) {
    timeSeries(
      input: {
        granularity: WEEK
```

By changing the granularity setting, you will change how your data is broken up in the time series visualization. These changes will automatically refresh in your web browser.

You can read additional information in [Propel GraphQL API docs](https://www.propeldata.com/docs/api/about-the-graphql-api), specifically on the page for `TimeSeriesInput` at [TimeSeries Input reference docs](https://www.propeldata.com/docs/api/reference/inputs/TimeSeriesInput).
