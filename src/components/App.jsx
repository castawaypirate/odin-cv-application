import { useState } from "react";
import "../styles/App.css";
import { GeneralForm } from "./GeneralForm.jsx";
import { GeneralView } from "./GeneralView.jsx";
import { EducationalForm } from "./EducationalForm.jsx";
import { EducationalView } from "./EducationalView.jsx";

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

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setGeneralData({ ...Object.fromEntries(formData) });
    setShowGeneral(true);
  };

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
    </div>
  );
}

export default App;
