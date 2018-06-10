import React from "react";

function LoginForm(props) {
  return (
    <div>
      <h3>Login Page</h3>
    </div>
  );
}

function LogoutForm(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

export { LoginForm, LogoutForm };
