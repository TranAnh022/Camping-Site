import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Nav from "../../components/Nav";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Error from "../../components/Error";

type Props = {};

const Create = (props: Props) => {
  const { mode } = useSelector((state: any) => state);
  const [img, setImg] = useState<null | File>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMess, setErrorMess] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [camp, setCamp] = useState({
    title: "",
    location: "",
    price: 0,
    description: "",
  });
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/");
  }, []);

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
    setImg(selectedImage);

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target === null) return;
        setImageUrl(event.target.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
    setCamp((prevCampground) => ({
      ...prevCampground,
      image: selectedImage,
    }));
  };

  //Handle submit
  console.log(camp);

  const createCamp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:8080/campsites", camp, {
        withCredentials: true, // Send cookies with request
        headers: {
          "Content-Type": "multipart/form-data", // Set appropriate headers
        },
      }).then(() => {
        setCamp({
          title: "",
          location: "",
          price: 0,
          description: ""
        })
        navigate("/")
      });

    } catch (error) {
      setShowAlert(true);
      setErrorMess("There is an error. Please check again !!!");
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
          <h1 className="text-center my-3">New Camping Site</h1>
          <div className="col-6 offset-3">
            {/* FORM  */}
            <form
              onSubmit={createCamp}
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
                <input
                  className="form-control"
                  accept=".jpg,.jpeg,.png"
                  type="file"
                  id="formFileMultiple"
                  name="image"
                  onChange={handleImageChange}
                />
                {imageUrl && (
                  <div className="my-3 d-flex justify-content-center align-items-center">
                    <img
                      src={imageUrl}
                      alt="Selected"
                      className="img-thumbnail"
                      style={{ width: "10vw",height:"10vh" }}
                    />
                    <AiOutlineDelete
                      type="button"
                      className="text-center"
                      onClick={(e) => {
                        setImageUrl(null);
                        setImg(null);
                      }}
                    />
                  </div>
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
                <button className="btn btn-success">Add Campground</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
