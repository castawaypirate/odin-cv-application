import { useRef, useState } from "react";
import "../styles/App.css";
import { GeneralForm } from "./GeneralForm.jsx";
import { GeneralView } from "./GeneralView.jsx";
import { EducationalForm } from "./EducationalForm.jsx";
import { EducationalView } from "./EducationalView.jsx";
import { PracticalForm } from "./PracticalForm.jsx";
import { PracticalView } from "./PracticalView.jsx";

function App() {
  const [generalData, setGeneralData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [showGeneral, setShowGeneral] = useState(false);

  const [educationalData, setEducationalData] = useState({
    university: "",
    fieldOfStudy: "",
    from: "",
    to: "",
  });

  const [showEducational, setShowEducational] = useState(false);

  // should be array of objects, so we have one element for each job
  let id = crypto.randomUUID();
  const [practicalData, setPracticalData] = useState([
    {
      id: id,
      company: "",
      positionTitle: "",
      responsibilities: "",
      from: "",
      to: "",
    },
  ]);

  const [showPractical, setShowPractical] = useState(false);

  // kept native FormData here intentionally for personal reference
  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setGeneralData({ ...Object.fromEntries(formData) });
    setShowGeneral(true);
  };

  const formsRef = useRef([]);

  const handleGeneralEdit = () => {
    setShowGeneral(false);
  };

  const handleEducationalEdit = () => {
    setShowEducational(false);
  };

  // right way to get the data from a form in a child component
  const handleEducationalSubmit = (e, data) => {
    e.preventDefault();
    setEducationalData({ ...data });
    setShowEducational(true);
  };

  // two buttons in the practical section one type submit the other type button
  // for some reason but acted like submit, if fixed it adding different keys
  // but the other way was to e.preventDefault()
  const handlePracticalEdit = (e) => {
    // e.preventDefault();
    setShowPractical(false);
  };

  const handlePracticalSubmit = (e, data) => {
    e.preventDefault();
    // everything using prev and arrow function because if we do it outside setters
    // multiple iterations will happen without state properly updating creating lot
    // of bugs
    setPracticalData((prev) => [
      ...prev.filter((item) => item.id !== data.id),
      { ...data },
    ]);
    setShowPractical(true);
  };

  const triggerSubmit = () => {
    // iterate refs and call submit on each one of them
    // check if any of those are empty because they are
    // removed so no to invoke submit on them and crash
    // the program
    for (let formRef of formsRef.current) {
      if (formRef) {
        formRef.requestSubmit();
      }
    }
  };

  const addExperience = () => {
    let id = crypto.randomUUID();
    let newExp = {
      id: id,
      company: "",
      positionTitle: "",
      responsibilities: "",
      from: "",
      to: "",
    };

    let tempArr = [...practicalData];
    tempArr.push(newExp);

    setPracticalData(tempArr);
  };

  const removeExperience = (id) => {
    let tempArr = [...practicalData].filter((item) => item.id !== id);
    setPracticalData(tempArr);
  };

  return (
    <div className="appContainer">
      <h1>CV Application</h1>
      <section id="general">
        <h2>General Information</h2>
        {showGeneral ? (
          <GeneralView data={generalData} onEdit={handleGeneralEdit} />
        ) : (
          <GeneralForm data={generalData} onSubmit={handleGeneralSubmit} />
        )}
      </section>

      <section id="educational">
        <h2>Education</h2>
        {showEducational ? (
          <EducationalView
            data={educationalData}
            onEdit={handleEducationalEdit}
          />
        ) : (
          <EducationalForm
            data={educationalData}
            onSubmit={handleEducationalSubmit}
          />
        )}
      </section>
      <section id="practical">
        <h2>Experience</h2>
        {/* pass ref to every child component with formRef={(el) => (formsRef.current[i] = el)} which will connect to each form as ref */}
        {showPractical
          ? practicalData.map((exp) => (
              <PracticalView key={exp.id} data={exp} />
            ))
          : practicalData.map((exp, i) => (
              <PracticalForm
                formRef={(el) => (formsRef.current[i] = el)}
                key={exp.id}
                data={exp}
                onSubmit={handlePracticalSubmit}
                onRemove={() => removeExperience(exp.id)}
              />
            ))}

        <div className="exp-buttons">
          {showPractical ? (
            <button
              key="edit-btn"
              className="edit-btn"
              onClick={handlePracticalEdit}
              type="button"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                key="submit-btn"
                className="submit-btn"
                type="button"
                onClick={triggerSubmit}
              >
                Submit
              </button>

              <button onClick={addExperience} className="add-exp" type="button">
                Add Experience
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
