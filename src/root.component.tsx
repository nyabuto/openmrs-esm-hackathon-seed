import React from "react";
import LatestObs from "./patient_info/latest_obs";
import VisitParcel from "./visitsParcel";
import { BrowserRouter } from "react-router-dom";

export default function Root(props: RootProps) {
  return (
    <BrowserRouter basename="/openmrs/spa">
      <div>
        <div>
          <VisitParcel patientUuid={props.patientUuid} />
        </div>
        <div>
          <LatestObs patientUuid={props.patientUuid} />
        </div>
      </div>
    </BrowserRouter>
  );
}

type RootProps = {
  patientUuid: string;
};
