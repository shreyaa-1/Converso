import React, { useContext, useEffect, useState } from "react";
import "../styles/navbar.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import jwt_decode from "jwt-decode";
import fetchData from "../helper/apiCall";
import AppContext from "../context/userContext";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from '../images/chat-logoo.png';


const Navbar = () => {
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const { id } = jwt_decode(localStorage.getItem("token"));
  const [searchedUsers, setSearchedUsers] = useState([]);
  const { userInfo, setUserInfo, setLoading, resetStates } =
    useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);

  const searchBtn = async () => {
    const data = await fetchData(`/user/searchuser/${id}?search=${search}`);
    setSearchedUsers(data);
    setSearch("");
  };

  const fetch = async () => {
    const data = await fetchData(`/user/getuser/${id}/${id}`);
    setUserInfo(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const children = (
    <div className="profile__modal">
      {/* <img
        src={
          userInfo.pic ||
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        }
        alt="profile-pic"
      />
      <span className="profile__name">Name:{userInfo.name}</span>
      <span className="profile__email">{userInfo.email}</span> */}

      <div className="wrapper">
        <div class="user-card">
          <div className="user-card-img">
            <img
              src={
                userInfo.pic ||
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              }
              alt="profile-pic"
            />
          </div>
          <div className="user-card-info">
            <h4 className="name-display">{userInfo.name}</h4>
            {/* <p><span>Name:</span> {userInfo.name}</p> */}
            <p><span>Email:</span> {userInfo.email}</p>

          </div>
        </div>
      </div>


    </div>

  );

  const logout = () => {
    localStorage.clear();
    resetStates();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const createChat = async (ele) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `/chat/createchat/${id}`,
        {
          otherid: ele._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      setSearchedUsers([]);
      return;
    } catch (error) {
      return error;
    }
  };

  return (
    <nav>
      <div className="app__name"><img src={Logo} className="main-logo" /></div>
      <div className="search">
        <input
          type="text"
          placeholder="Search User"
          className="form-input search-input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <BiSearch />
        <button
          className="btn search__btn"
          onClick={searchBtn}
        >
          Search
        </button>
      </div>
      {searchedUsers.length > 0 ? (
        <div className="searched-users">
          {searchedUsers.map((ele) => {
            return (
              <div
                className="usercard"
                key={ele._id}
                onClick={() => {
                  createChat(ele);
                }}
              >

                <div
                  className={`usercard__image flex-center search-card__image`}
                >
                  <img
                    src={
                      ele.pic ||
                      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    }
                    alt="contact-pic"
                  />
                </div>
                <div className="usercard__info">
                  <h4 className="usercard__name">{ele.name}</h4>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}

      <div className="navbar__icons">
        <div className="profile__image" onClick={() => {
          setModalOpen(!modalOpen);
        }}>
          <img
            src={
              userInfo.pic ||
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            }
            alt="profile-pic"
          />
        </div>

      </div>
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          children={children}
          handleClick={logout}
          btnname={"Logout"}
          mClass="nav-profile-modal"
        />
      )}
    </nav>
  );
};

export default Navbar;
