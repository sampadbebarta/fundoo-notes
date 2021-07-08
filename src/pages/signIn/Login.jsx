import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Services from "../../Services/userServices";
import Checkbox from "@material-ui/core/Checkbox";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./Login.css";
const service = new Services();

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      emailFlag: false,
      passwordError: "",
      passwordFlag: false,
      showPassword: false,
      setOpen: false,
      open: false,
      snackMessage: "",
      snackType: ""
    };
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  clickShowPass = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      emailError: "",
      emailFlag: false,
      passwordError: "",
      passwordFlag: false,
    };

    if (this.state.email.length === 0) {
      errors.emailFlag = true;
      isError = true;
      errors.emailError = "Enter your Email ";
    }
    if (!/[a-zA-Z0-9._]+[@]{1}[a-zA-Z120-9]*[.]{1}[a-zA-Z]*$/.test(this.state.email)) {
      errors.emailFlag = true;
      isError = true;
      errors.emailError = "Email is not proper";
    }
    if (this.state.password.length === 0) {
      errors.passwordFlag = true;
      isError = true;
      errors.passwordError = "Enter Password";
    }

    this.setState({
      ...errors,
    });

    return isError;
  };

  handleClose = () => {
    this.setState({
      open: false,
      setOpen: false
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.setState({
        email: "",
        emailFlag: false,
        emailError: "",
        password: "",
        passwordFlag: false,
        passwordError: "",
      });
      let loginData = {
        email: this.state.email,
        password: this.state.password,
      };
      service
        .login(loginData)
        .then((loginData) => {
          console.log("Login Successful " + JSON.stringify(loginData.data.id))
          localStorage.setItem("fundooToken", loginData.data.id)
          localStorage.setItem("fundooUserFName", loginData.data.firstName)
          localStorage.setItem("fundooUserLName", loginData.data.lastName)
          localStorage.setItem("fundooUserEmail", loginData.data.email)
          localStorage.setItem("fundooUserUserId", loginData.data.userId)
          this.setState({ snackType: "success", snackMessage: "Login successful", open: true, setOpen: true })
          setTimeout(() => { this.nextPath(`../dashboard/notes`); }, 3000);

        })
        .catch((loginData) => {
          let obj = JSON.stringify(loginData);
          console.log("Login Failed" + obj);
          this.setState({ snackType: "error", snackMessage: "Login Failed", open: true, setOpen: true })
        });
    } else {
      console.log("Login Failed");
    }
  };

  render() {
    return (
      <div className="main">
        <div elevation={0} className="page">
          <span className="inlineTitle">
            <b>
              <font color="#1976d2">F</font>
              <font color="#e53935">u</font>
              <font color="#ffb74d">n</font>
              <font color="#1976d2">d</font>
              <font color="#388e3c">o</font>
              <font color="#e53935">o</font>
            </b>
          </span>
          <span className="signIn">Sign in</span>
          Use your Fundoo Account
          <form className="loginForm">
            <div className="inputfield">
              <TextField
                size="small"
                className="input"
                label="Email"
                variant="outlined"
                name="email"
                value={this.state.email}
                helperText={this.state.emailError}
                error={this.state.emailFlag}
                onChange={(e) => this.change(e)}
              />
            </div>
            <div className="passField">
              <TextField
                size="small"
                className="input"
                label="Password"
                type={this.state.showPassword ? "text" : "password"}
                variant="outlined"
                name="password"
                value={this.state.password}
                onChange={(e) => this.change(e)}
                error={this.state.passwordFlag}
                helperText={this.state.passwordError}
              />

            </div>
            <span className="checkBox">
              <Checkbox
                onClick={this.clickShowPass}
                color="primary"
                className="showPass"
              />
              Show Password
            </span>
            <div className="forgetPassword">
              <Button color="primary" onClick={() => this.nextPath('../forgotPass')}>Forgot password?</Button>
            </div>
            <span className="footer">
              <div className="button">
                <Button color="primary" onClick={() => this.nextPath('../RegistrationForm')}>
                  Create account
                </Button>
              </div>
              <div className="button">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => this.onSubmit(e)}>
                  Sign In
                </Button>
              </div>
            </span>
          </form>
        </div>
        <div>
          <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}  >
            <Alert severity={this.state.snackType}>
              {this.state.snackMessage}
            </Alert>
          </Snackbar >
        </div>
      </div>
    );
  }
}