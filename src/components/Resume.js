function Resume(props) {
  const {
    startDate,
    endDate,
    company,
    position,
    description: details,
    grade = null,
    fieldOfStudy = null,
    institute = null,
    degree = null,
  } = props.resumeData;
  const year = `${new Date(startDate).getFullYear()} - ${endDate ? new Date(endDate).getFullYear() : "Present"}`;
  const university = company;
  return (
    <div className="mi-resume mt-30">
      <div className="mi-resume-summary">
        <h6 className="mi-resume-year">{year}</h6>
      </div>
      <div className="mi-resume-details">
        <h5>{position || degree}</h5>
        {fieldOfStudy && (
          <>
            <small>{fieldOfStudy}</small> <br />
          </>
        )}
        <h6 className="mi-resume-company">{company || institute}</h6>
        <div
          className="mi-resume-description"
          dangerouslySetInnerHTML={{ __html: details }}
        ></div>
        {grade && (
          <div className="mi-resume-grade">
            <strong>Grade:</strong> {grade}
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;
