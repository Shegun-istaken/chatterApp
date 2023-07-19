import { useState, useRef, useEffect } from "react";
import { useManageUsers } from "../../firebase_setup/firebase";
import AuthConsumer from "../../context/UserContext";
import { auth } from "../../firebase_setup/firebase";
import { useNavigate, useLocation } from "react-router-dom";

const initialData = {
  userName: "",
  name: "",
  status: "writer",
  bio: "",
};

type initialDataType = {
  userName: string;
  name: string;
  status: string;
  bio: string;
};

function PersonalizationForm({ edit }: { edit?: boolean }) {
  const userNameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const { setNewUser, updateUserData } = useManageUsers();
  const { createUserReport, userData, emailStatus } = AuthConsumer();
  const [formData, setFormData] = useState<initialDataType>(initialData);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const location = useLocation()

  console.log(auth.currentUser);

  useEffect(()=>{
    if(emailStatus == false){
      navigate('/login/verifyMail')
    }
  }, [emailStatus, navigate])
  
  useEffect(() => {
      if(location.pathname == "/personalData" && userData){
        navigate("/editData")
      }
  }, [location, userData, navigate]);

  useEffect(() => {
    if (userData && edit) {
      setFormData({
        userName: userData?.userName,
        name: userData?.name,
        bio: userData?.bio,
        status: userData?.status,
      });
    }
  }, [userData, navigate, edit]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!edit) {
      setNewUser(formData.userName, formData, avatarRef.current.files[0]);
    } else {
      const response = await updateUserData(
        formData,
        avatarRef.current.files[0]
      );
      if (typeof response == "string") {
        setResponse(response);
      }
    }
  }

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    type: string
  ) {
    const value = e.target.value;

    switch (type) {
      case "userName":
        setFormData({ ...formData, userName: value });
        break;
      case "name":
        setFormData({ ...formData, name: value });
        break;
      case "bio":
        setFormData({ ...formData, bio: value });
        break;
      case "status":
        setFormData({ ...formData, status: value });
        console.log(value);
    }
  }

  return (
    <div className="personalizationPage">
      <form
        className="personalizationPage"
        onSubmit={handleSubmit}
        id="personalForm"
      >
        <h2>Tell us about yourself...</h2>
        {!edit && (
          <div>
            <label htmlFor="userName">Enter a Unique Username </label>
            <input
              ref={userNameRef}
              value={formData.userName}
              onChange={(e) => {
                handleInputChange(e, "userName");
              }}
              id="userName"
              type="text"
              placeholder="newUser_23"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="name">What is your Name</label>
          <input
            value={formData.name}
            onChange={(e) => {
              handleInputChange(e, "name");
            }}
            id="name"
            type="text"
            required
            ref={nameRef}
          />
        </div>

        <div>
          <label htmlFor="bio">
            Tell us a little about yourself <small>optional</small>
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => {
              handleInputChange(e, "bio");
            }}
            id="bio"
            cols={30}
            rows={10}
          ></textarea>
        </div>

        <div>
          <label htmlFor="status">How do you want to use Chatter? :</label>
          <select
            id="status"
            form="personalForm"
            value={formData.status}
            onChange={(e) => {
              handleInputChange(e, "status");
            }}
            required
            ref={statusRef}
          >
            <option value="writer">Writer</option>
            <option value="reader">Reader</option>
          </select>
        </div>

        <div>
          <label htmlFor="avatarInput">
            Add a Profile Picture <small>optional</small>
          </label>
          <input
            ref={avatarRef}
            type="file"
            id="avatarInput"
            accept=".jpg, .jpeg, .png"
          />
        </div>

        <div>
          <p className="error">{response && response} </p>
          <button className="common">Submit</button>
        </div>

        {createUserReport && <p>{createUserReport}</p>}
      </form>
    </div>
  );
}

export default PersonalizationForm;
