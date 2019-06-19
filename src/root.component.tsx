import React from "react";
import VisitsParcel from "./visitsParcel";
import { BrowserRouter } from "react-router-dom";

export default function Root(props: RootProps) {
  return (
    <BrowserRouter basename="/openmrs/spa">
      <div>
        <VisitsParcel patientUuid={props.patientUuid} />
      </div>
    </BrowserRouter>
  );
}

type RootProps = {
  patientUuid: string;
};
