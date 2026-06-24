import { call, put, takeEvery, takeLatest, retry, select, cancelled } from "redux-saga/effects";
import {delay} from "redux-saga/effects";
import * as A from "./actions";

// API CALLS
const fetchPatientsAPI = () =>

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(r => r.json());

const fetchPatientDetailsAPI = (id) =>

  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(r => r.json());

const submitPatientAPI = (data) =>

  fetch("https://jsonplaceholder.typicode.com/posts", 
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json());


// Worker Saga

// FETCH PATIENTS
function* fetchPatientsSaga() {

  try {
    yield put({ type: A.SET_LOADING, payload: true });

    const data = yield retry(3, 1000, fetchPatientsAPI);

    yield put({ type: A.SET_PATIENTS, payload: data });

  } 
  catch (e) 
  {
    yield put({ type: A.SET_ERROR, payload: e.message });
  }
}

// SUBMIT FORM 
function* submitFormSaga(action) 
{
  console.log("Submitting form", action.payload);

  try {
    if (!navigator.onLine) 
    {
      yield put({ type: A.QUEUE_PATIENT_FORM, payload: action.payload });
      return;
    }

    const response = yield call(submitPatientAPI, action.payload);

    const formatted = {
      id: Date.now(),
      name: action.payload.name,
      age: action.payload.age,
      disease: action.payload.disease,
      doctorAssigned: action.payload.doctorAssigned
    };

    // add patient
    yield put({
      type: A.SUBMIT_PATIENT_SUCCESS,
      payload: formatted
    });

    // GET CURRENT STATE
    const state = yield select(s => s);

    // move to correct page
    yield put({
      type: A.SET_PAGE,
      payload: Math.ceil((state.patients.length + 1) / 5)
    });

  } catch (e) {
    yield put({ type: A.QUEUE_PATIENT_FORM, payload: action.payload });
  }
}

// PROCESS QUEUE
function* processQueueSaga() 
{
  const queue = yield select(s => s.offlineQueue);

    yield put({
      type: A.CLEAR_QUEUE
    });

    for (let item of queue) 
    {
      const response = yield call(
        submitPatientAPI,
        item
      );

      yield put({
        type: A.SUBMIT_PATIENT_SUCCESS,
        payload: {
          ...item,
          id: Date.now() + Math.random()
        }
      });
    }

  }

// PATIENT DETAILS
function* patientDetailsSaga(action) 
{
  try {
    yield delay(3000); // Simulate network delay

    yield put({ type: A.SET_LOADING, payload: true });

    const data = yield call(fetchPatientDetailsAPI, action.payload);

    yield put({ type: A.SET_PATIENT_DETAILS, payload: data });

  } catch (e) {
    yield put({ type: A.SET_ERROR, payload: e.message });
  }
  finally {
    if(yield cancelled())
    {
      console.log("Cancelled: ", action.payload);
    }
  }
}

// ROOT SAGA - Watcher Saga
export default function* rootSaga() 
{
  yield takeEvery(A.FETCH_PATIENTS, fetchPatientsSaga);

  yield takeEvery(A.SUBMIT_PATIENT_FORM, submitFormSaga);

  yield takeEvery(A.PROCESS_QUEUE, processQueueSaga);

  yield takeLatest(A.FETCH_PATIENT_DETAILS, patientDetailsSaga);
}
