import { useState } from "react";
import Button from "../components/signin/Button";
import { BottomWarning } from "../components/signin/ButtonWarning";
import Card from "../components/signin/Card";
import Heading from "../components/signin/Heading";
import Input from "../components/signin/Input";
import SubHeading from "../components/signin/SubHeading";
import { SignIn } from "../store/axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInButtonHandller = async () => {
    if (email === "" || password === "") {
      window.alert("Email, Password cannot be blank");
      return;
    }
    try {
      const { data, status } = await SignIn({
        username: email,
        password: password,
      });

      if (status === 200 || status === 201) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
        return;
      }
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setPassword("");
    window.alert("Invalid Credential");
  };
  return (
    <Card>
      <Heading label={"Sign In"} />
      <SubHeading label={"Enter your credential to access the account."} />
      <form>
        <Input
          label={"Email"}
          placeholder={"pradeepjoshi@gmail.com"}
          inputId="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Input
          label={"Password"}
          placeholder={"123456"}
          inputId={"password"}
          value={password}
          type={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button label={"Sign In"} onClick={signInButtonHandller} />
      </form>
      <BottomWarning
        label={"Don't have a account?"}
        buttonText="Sign Up"
        to={"/signup"}
      />
    </Card>
  );
};

export default Signin;
