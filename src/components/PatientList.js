import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_PATIENTS, SET_PAGE } from "../redux/actions";

export default function PatientList() 
{
  const dispatch = useDispatch();
  const patients = useSelector((s) => s.patients);
  const currentPage = useSelector((s) => s.currentPage);

  useEffect(() => {
    dispatch({ type: FETCH_PATIENTS });
  }, [dispatch]);

  const start = (currentPage - 1) * 5;
  const current = patients.slice(start, start + 5);

  const totalPages = Math.ceil(patients.length / 5);

  return (
    <div>
      <h2 className="section-title">Patients</h2>

        {current.map((p, index) => (
        <div key={p.id || index} className="patient-item">
            {p.name || p.username || p.title || "No Name"}
        </div>
        ))}

      {Array.from({ length: totalPages }, (_, i) => (
      <button
            key={i + 1}
            onClick={() =>
            dispatch({
                type: SET_PAGE,
                payload: i + 1
            })
            }
       >
      {i + 1}
      </button>
))}
    </div>
  );
}
