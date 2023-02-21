import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Map from "../../components/Map";
//import Mapbox from "../../components/Mapbox";

import Nav from "../../components/Nav";
import { setCampsites } from "../../state";
import CampsiteCard from "../../components/CampsiteCard";
import { CampsiteType } from "../../App";
import { useNavigate } from "react-router-dom";

type Props = {};

const campgroundLocation = {
  longitude: -103.5917,
  latitude: 40.6699,
};

const Campsite = (props: Props) => {
  const { mode, campsites, user} = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if(!user)  navigate("/")
  const getCamsites = async () => {
    const response = await fetch("http://localhost:8080/campsites", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setCampsites({ campsites: data }));
  };
  useEffect(() => {
    getCamsites();
  }, []);

  return (

    <div
      className={`container-fuild d-flex flex-column bg-${
        mode === "light" ? "light" : "black text-light"
        }`}
    >
      <Nav />
      {/* <Map campgroundLocation={campgroundLocation} /> */}
      {/* <Mapbox campgroundLocation={campgroundLocation} /> */}
      <div
        className="container d-flex flex-column align-items-center mt-3"

      >
        <h1>Explore the Camping Site</h1>
        <div className="row justify-content-center gap-5 ">
          {campsites.map((props: CampsiteType) => (
            <CampsiteCard {...props} key={props._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campsite;
