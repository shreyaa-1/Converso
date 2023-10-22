import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "./api";
import { Link, useNavigate } from "react-router-dom";

// import "./style.css";
// import { faPencil, faPenClip } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
// import Signup from "./signup";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function PersonalProfile() {
  const navigate = useNavigate();

  let { id } = useParams();
  const [data, setData] = useState([]);
  // useEffect(()=>{

  //   axios.get(`/user/${id}`).then((res) => {
  //     console.log(res.data["user"]);
  //     if(!(res.data["user"])){
  //       navigate(`*`)
  //     }
  //     setData(res.data["user"]);
  //   }).catch((err)=>{
  //     if(err) console.log(err);
  //   })
  // },[])
// const handleDelete=()=>{
//   axios.delete(`/user/${id}`).then((res)=>{
//     if(res.data.successMessage){
//       alert("Your account has been deleted successfully")
//       navigate(`/signup/0/0`);

//     }
//   }).catch((err)=>{
//     if(err) console.log(err);
//   })
// };
// const handleLogout=()=>{
//   axios.post(`/user/logout`).then((res)=>{
//     if(res.data.successMessage){
//       alert("Logout Successful")
//       navigate(`/login`);

//     }
//   }).catch((err)=>{
//     if(err) console.log(err);
//   })
// };
  return (
    <>
    <Navbar/>
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src={data.imgLink}
                    alt="Avatar"
                    className="my-5"
                    style={{ width: "80px" }}
                    fluid
                  />
                  <MDBTypography tag="h5">{data.name}</MDBTypography>
                  <MDBCardText>{data.por}</MDBCardText>
                  {/* <MDBIcon far icon="edit mb-5" /> */}
                  {/* <a href={`/signup/${id}/1`}> */}
{/* 
                  <FontAwesomeIcon icon={faPencil} size="1x" color="white" />
                  </a> */}
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">PROFILE</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.email}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.cellphone}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">
                          Position of Responsibility
                        </MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.por}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.cellphone}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      {/* <a href={data.fb}>
                        <FontAwesomeIcon
                          icon={faFacebookF}
                          size="1x"
                          color="blue"
                          style={{ margin: "10px" }}
                        />
                      </a> */}
                      {/* <a href={data.twitter}>
                        <FontAwesomeIcon
                          icon={faTwitter}
                          size="1x"
                          color="blue"
                          style={{ margin: "10px" }}
                        />
                      </a>
                      <a href={data.insta}>
                        <FontAwesomeIcon
                          icon={faInstagram}
                          size="1x"
                          color="blue"
                          style={{ margin: "10px" }}
                        />
                      </a> */}
                      {/* <button id="deleteBtn" onClick={handleDelete} type="button" class="mx-3 btn btn-danger">Delete Account</button> */}
                    </div>
                    {/* <button id="logoutBtn" onClick={handleLogout} type="button" class="btn btn-dark">Logout</button> */}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        
      </MDBContainer>
    </section>
    </>
  );
}
