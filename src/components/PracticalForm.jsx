import { useState } from "react";
import "../styles/PracticalForm.css";

export function PracticalForm({ formRef, data, onSubmit, onRemove }) {
  const [formData, setFormData] = useState({ ...data });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <form
        ref={formRef}
        onSubmit={(e) => onSubmit(e, formData)}
        className="practicalForm"
      >
        <div className="formControl">
          <label htmlFor="company">Company</label>
          <input
            onChange={handleChange}
            type="text"
            name="company"
            value={formData.company}
          />
        </div>
        <div className="formControl">
          <label htmlFor="positionTitle">Position Title</label>
          <input
            onChange={handleChange}
            type="text"
            name="positionTitle"
            value={formData.positionTitle}
          />
        </div>
        <div className="formControl">
          <label htmlFor="responsibilities">Responsibilities</label>
          <input
            onChange={handleChange}
            type="text"
            name="responsibilities"
            value={formData.responsibilities}
          />
        </div>
        <div className="formControl">
          <label htmlFor="from">From</label>
          <input
            onChange={handleChange}
            type="date"
            name="from"
            value={formData.from}
          />
        </div>
        <div className="formControl">
          <label htmlFor="to">To</label>
          <input
            onChange={handleChange}
            type="date"
            name="to"
            value={formData.to}
          />
        </div>
      </form>
      <button onClick={onRemove} className="remove-btn" type="button">
        Remove Experience
      </button>
    </>
  );
}
