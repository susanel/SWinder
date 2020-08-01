import React from "react";
import { Link } from "react-router-dom";

class LoginPage extends React.Component {
  state = {};
  render() {
    return (
      <div className="login">
        <Link to="/card">
          <button>Find your match</button>
        </Link>
      </div>
    );
  }
}

export default LoginPage;
