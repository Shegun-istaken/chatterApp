type valueType = {
  userName?: string;
  // firstName?: string;
  // lastName?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
};

function signUpValidate(values: valueType) {
  const errors: valueType = {};

  if (!values.userName) {
    errors.userName = "Required";
  } else if (values.userName.length > 15) {
    errors.userName = "Must be 15 characters or less";
  }

  // if (!values.firstName) {
  //   errors.firstName = "Required";
  // } else if (values.firstName.length > 15) {
  //   errors.firstName = "Must be 15 characters or less";
  // }

  // if (!values.lastName) {
  //   errors.lastName = "Required";
  // } else if (values.lastName.length > 20) {
  //   errors.lastName = "Must be 20 characters or less";
  // }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 characters or more";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.password = "Passwords must be the same";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
}

function loginValidate(values: valueType) {
  const errors: valueType = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 characters or more";
  }

  return errors;
}

function emailValidate(values: valueType){
  const errors: valueType = {}

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors
}

export{ signUpValidate, loginValidate, emailValidate }
