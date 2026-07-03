export function PracticalView({ data }) {
  const dates = () => {
    if (!data.from && !data.to) {
      return ``;
    }
    if (data.from && !data.to) {
      return `Dates: ${data.from} -`;
    }
    if (!data.from && data.to) {
      return `Dates: - ${data.to}`;
    }
    if (data.from && data.to) {
      return `Dates: ${data.from} - ${data.to}`;
    }
  };

  return (
    <div className="practicalView">
      <h3>{data.company}</h3>
      <h3>{data.positionTitle}</h3>
      <h3>{data.responsibilities}</h3>
      <h3>{dates()}</h3>
    </div>
  );
}
