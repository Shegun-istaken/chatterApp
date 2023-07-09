type ErrorTypes = {
  report: string;
  type: string;
  start: boolean;
};

function DisplayErrorReport({ report, type, start }: ErrorTypes) {
  return (
    <div className="displayError">
      {start ? (
        report ? (
          report == "success" ? (
            <p className="success">{report}</p>
          ) : (
            <p className="error">{report}</p>
          )
        ) : (
          <p className="loading">
            {type == "login"
              ? "Signing you in...."
              : "Creating your Account..."}
          </p>
        )
      ) : null}
    </div>
  );
}

export default DisplayErrorReport;
