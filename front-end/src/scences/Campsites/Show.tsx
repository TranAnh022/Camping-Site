import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CampsiteType } from "../../App";
import Nav from "../../components/Nav";
import Map from "../../components/Map";
import { useSelector } from "react-redux";
import axios from "axios";
import ReviewCard from "../../components/ReviewCard";

type Props = {};

type UserType = {
  username: string;
  id: number;
  email: string;
};

const Show = (props: Props) => {
  const [campsite, setCampsite] = useState<CampsiteType>();
  const [user, setUser] = useState<UserType>();
  const { id } = useParams();
  const mode = useSelector(({ mode }: { mode: string }) => mode);
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();
  const getCampsite = async () => {
    const response = await fetch(`http://localhost:8080/campsites/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responsed = await response.json();
    setCampsite(responsed);
  };
  useEffect(() => {
    getCampsite();
    const userLocal = JSON.parse(localStorage.getItem("user") as string);
    setUser(userLocal);
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/campsites/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };
  return (
    <div className={`container-fuild d-flex flex-column `}>
      <Nav />
      <div className="container d-flex flex-column-reverse flex-md-row justify-content-md-between my-5 gap-5 ">
        {/* Right */}
        <div className="col-md-6 col-11">
          <div className={`card bg-${mode === "light" ? "white" : "dark"}`}>
            <img
              src={campsite?.images?.url}
              className="card-img-top object-fit-cover"
              alt="campsite_img"
              style={{ height: "35vh" }}
            />
            <div className="card-body">
              <h5 className="card-title text-uppercase">{campsite?.title}</h5>
              <p className="card-text text-uppercase">{campsite?.location}</p>
              <p className="card-text">
                {campsite?.description}
              </p>
            </div>
            <ul
              className={`list-group list-group-flush bg-${
                mode === "light" ? "white" : ""
              }  `}
            >
              <li
                className={`list-group-item bg-${
                  mode === "light"
                    ? "white"
                    : "dark text-white border-top border-secondary "
                }`}
              >
                ${campsite?.price}/night
              </li>
              <li
                className={`list-group-item bg-${
                  mode === "light"
                    ? "white"
                    : "dark text-white border-bottom border-secondary"
                }`}
              >
                <b>Submmited by {campsite?.author?.username}</b>
              </li>
            </ul>
            {user?.id === campsite?.author.id && (
              <div className="card-body d-flex gap-2">
                <a
                  href={`/campsites/${campsite?._id}/edit`}
                  className="card-link btn btn-info"
                >
                  Edit
                </a>
                <form onSubmit={handleDelete}>
                  <button className="card-link btn btn-danger">Delete</button>
                </form>
              </div>
            )}
          </div>
        </div>
        {/* Left */}
        <div className="col-md-6 col-11">
          <div className="card">
            {campsite?.title && campsite.location && campsite.geometry && (
              <Map
                coordinates={{
                  longitude: campsite?.geometry?.coordinates[0],
                  latitude: campsite?.geometry?.coordinates[1],
                }}
                title={campsite?.title}
                location={campsite?.location}
                mode={mode}
              />
            )}
          </div>
          <div>
            <h3 className="mt-3">Reviews</h3>
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                  >
                    Write a review
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <form></form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {campsite?.reviews.map((review) => (
            <ReviewCard {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Show;
