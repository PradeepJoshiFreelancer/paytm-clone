import Button from "../components/signin/Button";
import { BottomWarning } from "../components/signin/ButtonWarning";
import Card from "../components/signin/Card";
import Heading from "../components/signin/Heading";
import Input from "../components/signin/Input";
import SubHeading from "../components/signin/SubHeading";
import { SignIn } from "../store/axios";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

const Signin = () => {
  // const [email, setEmail] = useState("");
  const {
    value: email,
    hasError: emailIsValid,
    reset: emailReset,
    enteredValueHandller: emailChangeHandller,
    enteredValueBlurrHandller: emailBlurrHandller,
  } = useInput((value: string) => {
    return value.trim() === ""
  })
  const {
    value: password,
    hasError: passwordIsValid,
    reset: passwordReset,
    enteredValueHandller: passwordChangeHandller,
    enteredValueBlurrHandller: passwordBlurrHandller,
  } = useInput((value: string) => {
    return value.trim() === ""
  })
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
    emailReset()
    passwordReset()
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
          onChange={emailChangeHandller}
          onBlur={emailBlurrHandller}
          isValueValid={emailIsValid}
        />

        <Input
          label={"Password"}
          placeholder={"123456"}
          inputId={"password"}
          value={password}
          type={"password"}
          onChange={passwordChangeHandller}
          onBlur={passwordBlurrHandller}
          isValueValid={passwordIsValid}
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
