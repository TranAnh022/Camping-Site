import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Error from "../../components/Error";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../../components/Nav";

type Props = {};

const Edit = (props: Props) => {
  useEffect(() => {
    if (!user) navigate("/");
    getCampsite();
  }, []);

  const { id } = useParams();
  const { mode } = useSelector((state: any) => state);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMess, setErrorMess] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [camp, setCamp] = useState({
    title: "",
    location: "",
    price: 0,
    description: "",
    _id: "",
  });
  const user = localStorage.getItem("user");
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
    setCamp(responsed);
    setImageUrl(responsed?.images?.url);
  };

  //Handle Iput
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCamp((prevCampground) => ({ ...prevCampground, [name]: value }));
  };

  //Handle Image

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target === null) return;
        setImageUrl(event.target.result as string);
      };
      reader.readAsDataURL(selectedImage);
      setImage(selectedImage);
    }
    setCamp((prevCampground) => ({
      ...prevCampground,
      image: selectedImage,
    }));
  };

  const updateCamp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", camp.title);
    formData.append("location", camp.location);
    formData.append("price", String(camp.price));
    formData.append("description", camp.description);
    formData.append("image", image as File);

    try {
      await axios.put(`http://localhost:8080/campsites/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Set appropriate headers
        },
      })
      .then(() => {
        navigate("/");
      });
    } catch (error: any) {
      console.log(error);
      setShowAlert(true);
      setErrorMess(error.message);
    }
  };
  return (
    <div
      className={`container-fuild d-flex flex-column align-items-center`}
      style={{ height: "100vh" }}
    >
      <Nav />

      <div
        className={`bg-${
          mode === "light" ? "white" : "dark"
        } col-md-6 my-5 h-full`}
      >
        {showAlert && <Error error={errorMess} setShowAlert={setShowAlert} />}
        <div className="row h-full">
          <h1 className="text-center my-3">Edit Camping Site</h1>
          <div className="col-6 offset-3">
            {/* FORM  */}
            <form
              onSubmit={updateCamp}
              noValidate
              className="validation_form"
              encType="multipart/form-data"
            >
              <div className="mb-3">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  name="title"
                  value={camp.title}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Please provide a title</div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="location">
                  Location
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="location"
                  name="location"
                  value={camp.location}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Please provide a location.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label">
                  Upload Images
                </label>
                {imageUrl ? (
                  <div className="my-3 d-flex justify-content-center align-items-center">
                    <div className="row">
                      <div className="col-10">
                        <img
                          src={imageUrl}
                          alt="Selected"
                          className="img-thumbnail"
                          style={{ width: "auto", height: "20vh" }}
                        />
                      </div>
                      <div className="col-2">
                        <AiOutlineDelete
                          type="button"
                          className="text-center"
                          onClick={(e) => {
                            setImageUrl(null);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <input
                    className="form-control"
                    accept=".jpg,.jpeg,.png"
                    type="file"
                    id="formFileMultiple"
                    name="image"
                    onChange={handleImageChange}
                  />
                )}
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="price">
                  Campground Price
                </label>
                <div className="input-group">
                  <span className="input-group-text" id="price-label">
                    $
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="0.00"
                    aria-label="price"
                    aria-describedby="price-label"
                    name="price"
                    min="0.00"
                    value={camp.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={camp.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="my-4">
                <button className="btn btn-info">Update Campground</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
