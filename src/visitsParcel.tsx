import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

function VisitsParcel(props: VisitsParcelProps) {
  const [visits, setVisits] = React.useState([]);

  React.useEffect(() => {
    const queryParams = `
    custom:(uuid,startDatetime,stopDatetime,encounters:(uuid,encounterType:(uuid,display)))
    `.replace(/\s/g, "");

    fetch(
      `/openmrs/ws/rest/v1/visit?limit=3&patient=${props.patientUuid}&v=${queryParams}`
    )
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(
            `Cannot fetch visit information for patient ${props.patientUuid} - server responded with '${resp.status}'`
          );
        }
      })
      .then(visits => {
        setVisits(visits.results);
      });
  }, []);

  return visits ? renderVisits() : renderLoader();

  function renderLoader() {
    return <div>Loading visits...</div>;
  }

  function renderVisits() {
    return (
      <div>
        <div>Recent Visits</div>
        <table>
          <tbody>
            {visits.map((visit, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link
                      to={`/patient-dashboard/${props.patientUuid}/visits/${visit.uuid}/encounters`}
                    >
                      {dayjs(visit.startDatetime).format("DD.MMM.YYYY")}
                    </Link>
                  </td>
                  <td>
                    {visit.encounters.map((encounter, index2) => {
                      return <span>{encounter.encounterType.display}</span>;
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
type VisitsParcelProps = {
  patientUuid: string;
};

export default VisitsParcel;
