export function GeneralView({ data, onEdit }) {
  return (
    <div id="generalView">
      <h3>
        {data.firstName} {data.lastName}
      </h3>
      <h3>{data.email}</h3>
      <h3>{data.phone}</h3>
      <button className="edit-btn" onClick={onEdit} type="button">
        Edit
      </button>
    </div>
  );
}
