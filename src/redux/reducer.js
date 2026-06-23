import * as A from "./actions";

const initialState = {
  patients: [],
  currentPage: 1,
  offlineQueue: [],
  patientDetails: null,
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  
  switch (action.type) {

    case A.SET_PATIENTS:
      return { ...state, patients: action.payload, loading: false };

    case A.SUBMIT_PATIENT_SUCCESS:
      console.log("Patient added successfully", action.payload);
      return {
        ...state,
        patients: [...state.patients, action.payload]
      };

    case A.SET_LOADING:
      return { ...state, loading: action.payload };

    case A.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case A.SET_PAGE:
      return { ...state, currentPage: action.payload };

    case A.QUEUE_PATIENT_FORM:
      return {
        ...state,
        offlineQueue: [...state.offlineQueue, action.payload]
      };

    case A.CLEAR_QUEUE:
      return { ...state, offlineQueue: [] };

    case A.SET_PATIENT_DETAILS:
      return { ...state, patientDetails: action.payload, loading: false };

    default:
      return state;
  }
}
