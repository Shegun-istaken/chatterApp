import { useRef } from "react";
import { useManageUsers } from "../../firebase_setup/firebase";
import AuthConsumer from "../../context/UserContext";

function PersonalizationForm() {
  const userNameRef = useRef();
  const statusRef = useRef();
  const nameRef = useRef();
  const {setNewUser} = useManageUsers()
  const {createUserReport} = AuthConsumer()

  function handleSubmit(e) {
    e.preventDefault();
    const formValues = {
      userName: userNameRef.current.value,
      name: nameRef.current.value,
      status: statusRef.current.value,
    };

    setNewUser(userNameRef.current.value, formValues);
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

        <button>Submit</button>

        {createUserReport && <p>{createUserReport}</p> }
      </form>
    </div>
  );
}

export default PersonalizationForm;
