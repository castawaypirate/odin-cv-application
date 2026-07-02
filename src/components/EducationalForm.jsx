import { useState } from "react";
import "../styles/EducationalForm.css";

export function EducationalForm({ data, onSubmit }) {
  const [formData, setFormData] = useState({ ...data });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <form onSubmit={(e) => onSubmit(e, formData)} id="educationalForm">
        <div className="formControl">
          <label htmlFor="university">University</label>
          <input
            onChange={handleChange}
            type="text"
            name="university"
            value={formData.university}
          />
        </div>
        <div className="formControl">
          <label htmlFor="fieldOfStudy">Field of Study</label>
          <input
            onChange={handleChange}
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
          />
        </div>
        <div className="formControl">
          <label htmlFor="from">From</label>
          <YearDropDown
            onChange={handleChange}
            value={formData.from}
            field={"from"}
          />
        </div>
        <div className="formControl">
          <label htmlFor="to">To</label>
          <YearDropDown
            onChange={handleChange}
            value={formData.to}
            field={"to"}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

function YearDropDown({ onChange, value, field }) {
  let dropdown_data = [];
  for (let year = 2025; year >= 1970; year--) {
    dropdown_data.push(`${year} - ${year + 1}`);
  }

  return (
    <div className="dropdown">
      <select onChange={onChange} name={field}>
        {value ? (
          <option>{value}</option>
        ) : (
          <option hidden value="">
            Select academic year
          </option>
        )}
        {dropdown_data.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}
