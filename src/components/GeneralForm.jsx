import { useState } from "react";
import "../styles/GeneralForm.css";

export function GeneralForm({ data, onSubmit }) {
  const [formData, setFormData] = useState({ ...data });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)} id="generalForm">
        <div className="formControl">
          <label htmlFor="firstName">First Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="firstName"
            value={formData.firstName}
          />
        </div>
        <div className="formControl">
          <label htmlFor="lastName">Last Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="lastName"
            value={formData.lastName}
          />
        </div>
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
          />
        </div>
        <div className="formControl">
          <label htmlFor="phone">Phone</label>
          <input
            onChange={handleChange}
            type="tel"
            name="phone"
            value={formData.phone}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
