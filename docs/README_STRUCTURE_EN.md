# Project Structure

This document provides an overview of the project's folder structure.

- **`public/`**: Contains static assets that are publicly accessible.
- **`src/`**: Contains the main source code for the application.
  - **`assets/`**: Contains static assets like images and fonts.
  - **`components/`**: Contains the React components for the application.
    - **`Chat/`**: Components related to the chat window.
    - **`Common/`**: Common, reusable components.
    - **`Logs/`**: Components for the logs viewer.
    - **`Schema/`**: Components for the schema browser.
    - **`Sources/`**: Components for the sources panel.
    - **`SQLPreview/`**: Components for the SQL preview panel.
    - **`TestRunner/`**: Components for the test runner.
    - **`Validation/`**: Components for the validation panel.
  - **`data/`**: Contains mock data for the application.
    - **`lookups/`**: Mock lookup data.
    - **`schema.json`**: The database schema.
    - **`test-cases.json`**: Test cases for the application.
  - **`pages/`**: Contains the main pages of the application.
  - **`services/`**: Contains the core services for the application.
    - **`logsService.ts`**: Service for persisting and retrieving logs.
    - **`mockEngine.ts`**: Service for generating mock SQL and handling validation.
    - **`schemaService.ts`**: Service for loading the database schema.
    - **`testsService.ts`**: Service for loading test cases.
  - **`store/`**: Contains the Redux store and slices.
    - **`sessionSlice.ts`**: Redux slice for session state.
    - **`store.ts`**: The Redux store.
    - **`uiSlice.ts`**: Redux slice for UI state.
  - **`utils/`**: Contains utility functions.
    - **`formatters.ts`**: Utility functions for formatting data.
    - **`sqlSanitizer.ts`**: Utility for sanitizing SQL queries.
    - **`time.ts`**: Utility for working with time.
  - **`App.css`**: Main stylesheet for the application.
  - **`App.tsx`**: The root component of the application.
  - **`index.css`**: Global stylesheet.
  - **`main.tsx`**: The entry point of the application.
  - **`theme.ts`**: The Material-UI theme for the application.