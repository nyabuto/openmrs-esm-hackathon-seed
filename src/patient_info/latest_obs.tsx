import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

function LatestObs(props: LatestObsProps) {
  const [latestObs, setLatestObs] = React.useState([]);
  var info = [];
  const conceptIds =
    "165095AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA," +
    "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA," +
    "5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA," +
    "5087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA," +
    "5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA," +
    "5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA," +
    "5092AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA," +
    "1650AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA," +
    "159947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA," +
    "5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,";
  const sectionHeaderStyle = {
    color: "#ea2234",
    fontWeight: 900,
    fontSize: "22px",
    textDecoration: "underline"
  };
  const obsHeaderStyle = {
    color: "#068ba5",
    fontWeight: 600,
    fontSize: "18px",
    marginRight: "10px"
  };
  const obsBodyStyle = {
    color: "#3f4d4f",
    fontSize: "16px",
    marginLeft: "10px",
    marginBottom: "3px"
  };
  // custom:(uuid,display,value,obsDatetime,concept:(uuid,name:(uuid,display,name)))
  React.useEffect(() => {
    const queryParams = `
    custom:(uuid,display,value,obsDatetime)
    `.replace(/\s/g, "");

    fetch(
      `/openmrs/ws/rest/v1/latestobs?limit=10&concept=${conceptIds}&patient=${props.patientUuid}&v=${queryParams}`
    )
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(
            `Cannot fetch latest observations for patient ${props.patientUuid} - server responded with '${resp.status}'`
          );
        }
      })
      .then(latestObs => {
        setLatestObs(latestObs.results);
      });
  }, []);

  return latestObs ? renderObs() : renderLoader();

  function renderLoader() {
    return <div>Loading visits...</div>;
  }

  function renderObs() {
    return (
      <div>
        <div style={sectionHeaderStyle}>Latest Observations</div>
        <br />

        {latestObs.map((observation, index) => {
          info = observation.display.split(":");
          return (
            <div>
              <div style={obsHeaderStyle}>
                {index + 1}.{info[0]}:
              </div>
              <div style={obsBodyStyle}>{info[1]}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
type LatestObsProps = {
  patientUuid: string;
};

export default LatestObs;
