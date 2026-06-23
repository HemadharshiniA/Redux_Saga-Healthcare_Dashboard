import { useState } from "react";
import { useDispatch } from "react-redux";
import { SUBMIT_PATIENT_FORM } from "../redux/actions";

export default function PatientForm() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "", age: "", disease: "", doctorAssigned: ""
  });

  const submit = (e) => { e.preventDefault();

  if (
    !form.name ||
    !form.age ||
    !form.disease ||
    !form.doctorAssigned
  ) 
  {
    alert("Please fill all fields");
    return;
  }

  dispatch({
    type: SUBMIT_PATIENT_FORM,
    payload: form
  });

  setForm({ name: "", age: "",
    disease: "", doctorAssigned: ""
  });
};

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Age"
        value={form.age}
        onChange={(e) =>
          setForm({ ...form, age: e.target.value })
        }
      />

      <input
        placeholder="Disease"
        value={form.disease}
        onChange={(e) =>
          setForm({ ...form, disease: e.target.value })
        }
      />

      <input
        placeholder="Doctor"
        value={form.doctorAssigned}
        onChange={(e) =>
          setForm({ ...form, doctorAssigned: e.target.value })
        }
      />

      <button type="submit">Save</button>
    </form>
  );
}

