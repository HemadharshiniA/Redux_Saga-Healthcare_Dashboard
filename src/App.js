
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PROCESS_QUEUE } from "./redux/actions";
import PatientList from "./components/PatientList";
import PatientForm from "./components/PatientForm";
import PatientDetails from "./components/PatientDetails";
import './App.css';


export default function App(){
 const [isOnline, setIsOnline] = useState(
  navigator.onLine
);
 const dispatch = useDispatch();

 useEffect(() => {

  const handleOnline = () => {
    console.log("Back online");
    setIsOnline(true);

    dispatch({
      type: PROCESS_QUEUE
    });
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };

}, [dispatch]);

return (
  <div className="app-container">

    <h1 className="dashboard-title">
      Healthcare Dashboard
    </h1>

    <div
      className={`network-status ${
        isOnline ? "online" : "offline"
      }`}
    >
      Network Status :
      {isOnline ? " Online" : " Offline"}
    </div>

    <div className="card">
      <PatientForm />
    </div>

    <div className="card">
      <PatientList />
    </div>

    <div className="card">
      <PatientDetails />
    </div>

  </div>
);
}

