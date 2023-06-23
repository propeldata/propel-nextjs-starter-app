# Propel Next.js Started App

This Propel Next.js Starter App is a simple web application that demonstrates how to use the Propel GraphQL API to display data visualizations in a web browser.

## Quickstart

For a step-by-step tutorial follow our [quickstart](https://www.propeldata.com/docs/quickstart).

> ⚠️ **If you are using the TacoSoft demo data,**: make sure to provision a P1_MEDIUM Propeller in your Propel Application. The P1_X_SMALL or P1_SMALL Propellers are not sufficient to run the queries on this data set.

## Set up your local development environment

Copy the `.env.sample` file to `.env.local` and update with your Propel Application client ID and secret.

```bash
cp .env.sample .env.local
```

```bash
CLIENT_ID=1jb...
CLIENT_SECRET=1og...
```

You'll find these API keys by navigating to https://console.propeldata.com/applications/, selecting your Propel Application, and looking at the section labeled "OAuth2 client credentials".

Leave the other environment variables that are already present in that file, such as `TOKEN_HOST` and `TOKEN_PATH`.

## Run your local development server

1. Run `yarn` to install dependencies.
2. Run `yarn dev` to launch the local development server.
3. Browse to https://localhost:3000.
4. Select your Metric from the drop-down menu.
5. Choose one of the sample charts, either a time series or counter visualization.
