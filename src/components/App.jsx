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
  const [practicalData, setPracticalData] = useState([
    {
      id: 1,
      company: "",
      positionTitle: "",
      responsibilities: "",
      from: "",
      to: "",
    },
  ]);

  const [showPractical, setShowPractical] = useState(false);

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

  const handleEducationalSubmit = (e, data) => {
    e.preventDefault();
    setEducationalData({ ...data });
    setShowEducational(true);
  };

  const handlePracticalEdit = (e) => {
    // e.preventDefault();
    setShowPractical(false);
  };

  const handlePracticalSubmit = (e, data) => {
    e.preventDefault();
    setPracticalData((prev) => [
      ...prev.filter((item) => item.id !== data.id),
      { ...data },
    ]);
    setShowPractical(true);
  };

  const triggerSubmit = () => {
    for (let formRef of formsRef.current) {
      if (formRef) {
        formRef.requestSubmit();
      }
    }
  };

  const addExperience = () => {
    let newExp = {
      id: practicalData.length + 1,
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
