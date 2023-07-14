import { useRef } from "react";
import { useManageUsers } from "../../firebase_setup/firebase";
import AuthConsumer from "../../context/UserContext";

function PersonalizationForm() {
  const userNameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const { setNewUser } = useManageUsers();
  const { createUserReport } = AuthConsumer();

  function handleSubmit(e) {
    e.preventDefault();
    const formValues = {
      userName: userNameRef.current.value,
      name: nameRef.current.value,
      status: statusRef.current.value,
    };

    setNewUser(userNameRef.current.value, formValues, avatarRef.current.files[0]);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} id="personalForm">
        <label htmlFor="userName">Enter a Unique Username </label>
        <input
          ref={userNameRef}
          id="userName"
          type="text"
          placeholder="newUser_23"
          required
        />

        <label htmlFor="name">What is your Name</label>
        <input id="name" type="text" required ref={nameRef} />

        <label htmlFor="status">How do you want to use Chatter? :</label>
        <select id="status" form="personalForm" required ref={statusRef}>
          <option value="writer">Writer</option>
          <option value="reader">Reader</option>
        </select>

        <label htmlFor="avatarInput">
          Add a Profile Picture <small>optional</small>
        </label>
        <input
          ref={avatarRef}
          type="file"
          id="avatarInput"
          accept=".jpg, .jpeg, .png"
        />

        <button>Submit</button>

        {createUserReport && <p>{createUserReport}</p>}
      </form>
    </div>
  );
}

export default PersonalizationForm;
