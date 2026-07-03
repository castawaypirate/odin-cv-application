export function EducationalView({ data, onEdit }) {
  return (
    <div id="educationalView">
      <h3>{data.university}</h3>
      <h3>{data.fieldOfStudy}</h3>
      <h3>Enrollment Year: {data.from && `${data.from}`}</h3>
      <h3>Graduation Year: {data.to && `${data.to}`}</h3>
      <button className="edit-btn" onClick={onEdit} type="button">
        Edit
      </button>
    </div>
  );
}
