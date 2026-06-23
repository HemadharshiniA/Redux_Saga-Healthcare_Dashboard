# Healthcare Dashboard - Redux Saga 

## Project Overview

This project is a Healthcare Dashboard built using React, Redux, and Redux-Saga.

The application demonstrates advanced state management and asynchronous handling using Redux-Saga while simulating real-world healthcare workflows such as patient management, patient details retrieval, offline form submission, and request cancellation.

---

## Features

### 1. Patient List

- Fetches patient data from API.
- Stores all patient records in Redux Store.
- Displays patients using pagination.
- Avoids unnecessary API calls by using data already available in Redux Store.

### 2. Patient Details

- Displays detailed information of a selected patient.
- Uses Redux-Saga `takeLatest()` to cancel previous requests when multiple patients are selected quickly.
- Ensures only the latest selected patient's data is displayed.

### 3. Patient Registration Form

- Allows user to add new patient details.
- Captures:
  - Name
  - Age
  - Disease
  - Doctor Assigned

### 4. Offline Queue Handling

- Detects network availability.
- If internet is unavailable:
  - Form submissions are stored in an offline queue.
- When internet connection is restored:
  - Queued submissions can be processed and submitted automatically.

### 5. Loading & Error Handling

- Displays loading state during API calls.
- Displays error messages when API requests fail.

---

## Bonus Features Implemented

### Request Cancellation

Implemented using:

```javascript
takeLatest()
```

When a user quickly switches between patients:

- Previous API requests are cancelled.
- Only the latest request is processed.

### Retry Mechanism

Implemented using:

```javascript
retry()
```

If an API request fails:

- Redux-Saga automatically retries the API call.
- Improves reliability during temporary network issues.

### Network Status Indicator

Displays:

- Online
- Offline

based on browser network status.

---

## Technologies Used

- React
- Redux
- React Redux
- Redux Saga
- JavaScript (ES6+)
- CSS3

---

## Project Structure

src
│
├── components
│ ├── PatientList.js
│ ├── PatientDetails.js
│ └── PatientForm.js
│
├── redux
│ ├── actions.js
│ ├── reducer.js
│ ├── saga.js
│ └── store.js
│
├── App.js
├── App.css
└── index.js

---

## Redux Saga Flow

```text
Component
   ↓
Dispatch Action
   ↓
Watcher Saga
   ↓
Worker Saga
   ↓
API Call
   ↓
put()
   ↓
Reducer
   ↓
Redux Store Updated
   ↓
UI Re-render
```

---

## Pagination Optimization

Instead of calling the API for every page:

1. Fetch all patient records once.
2. Store them in Redux Store.
3. Display records using array slicing.

Example:

```javascript
const start = (currentPage - 1) * 5;
const currentPatients = patients.slice(start, start + 5);
```

Benefits:

- Better performance
- Reduced API calls
- Faster page navigation

---

## Offline Queue Workflow

```text
User Submits Form
        ↓
Check Internet
        ↓
isOnline ? Submit API
        ↓
isOffline ? Store In Queue
        ↓
Internet Restored
        ↓
Process Queue
```

---

## takeLatest Workflow

```text
Doctor Clicks Patient A
        ↓
Request Starts

Doctor Clicks Patient B
        ↓
Cancel Patient A Request
        ↓
Load Patient B Details
```

This prevents stale data from appearing in the UI.

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate To Project

```bash
cd healthcare-dashboard
```

### Install Dependencies

```bash
npm install
```

### Install Redux Saga

```bash
npm install redux react-redux redux-saga
```

### Start Application

```bash
npm start
```

Application will run at:

```text
http://localhost:3000
```

---

## API Used

JSONPlaceholder APIs were used for demonstration purposes.

Patients:

```text
https://jsonplaceholder.typicode.com/users
```

Patient Details:

```text
https://jsonplaceholder.typicode.com/users/:id
```

---

## Learning Outcomes

Through this project, the following concepts were implemented and understood:

- Redux Store Configuration
- Redux Reducers
- Redux Actions
- Redux-Saga Middleware
- Generator Functions
- takeEvery()
- takeLatest()
- call()
- put()
- select()
- retry()
- Pagination Optimization
- Offline Queue Handling
- Network Monitoring
- Request Cancellation
- Error Handling

---

## Author

Hemadharshini A
