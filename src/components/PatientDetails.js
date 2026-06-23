import {useDispatch,useSelector} from "react-redux";
import {FETCH_PATIENT_DETAILS} from "../redux/actions";

export default function PatientDetails(){

 const dispatch=useDispatch();
 const details=useSelector(s=>s.patientDetails);

 return(
        <div className="patient-details">

                <button onClick={()=>dispatch({

                type:FETCH_PATIENT_DETAILS,payload:1
                })}>  Patient A </button>

                <button onClick={()=>dispatch({

                type:FETCH_PATIENT_DETAILS,payload:2
                })}> Patient B </button>

                {details && <h3>{details.name}</h3>}

        </div>
 );
}
