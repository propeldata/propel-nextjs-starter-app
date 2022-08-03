# Propel Demo Dashboard - NextJS & React

This demo app uses Propel Data to display simple dashboards for your dataset.

## How to use

### Create an application using Propel Data

Follow the quickstart guide at https://docs.propeldata.com/quickstart/ to get started.

You'll need to complete the following steps:

1. Create an Account
2. Connect a Data Source
3. Create a Data Pool
4. Define a Metric
5. Build an Application

Once you have built an Application inside Propel Data, you're ready to move on.

### Set up your local development environment

Rename the `env.sample` file in the project's root directory to `.env.local`, then edit that file to contain your own API keys.

```.env
CLIENT_ID_SAMPLE_APP=1jb...
CLIENT_SECRET_SAMPLE_APP=1og...
```

You'll find these API keys by navigating to https://console.propeldata.com/applications/, selecting your sample application, and looking at the section labeled **OAuth2 client credentials**.

Leave the other environment variables that are already present in that file, such as `TOKEN_HOST` and `TOKEN_PATH`.

### Run your local development server

1. Run `yarn` to install the sample application's dependencies.
2. Run `yarn dev` to launch the local development server.
3. Browse to https://localhost:3000.
4. Select your Metric from the drop-down menu.
5. Choose one of the sample charts, either a time series or counter visualization.

### Edit your GraphQL queries

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

You can read additional information in [Propel Data's GraphQL API docs](https://docs.propeldata.com/api/overview/), specifically on the page for `TimeSeriesInput` at https://docs.propeldata.com/api/reference/inputs/time-series-input/.
