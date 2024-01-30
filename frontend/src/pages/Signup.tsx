import Button from "../components/signin/Button";
import { BottomWarning } from "../components/signin/ButtonWarning";
import Card from "../components/signin/Card";
import Heading from "../components/signin/Heading";
import Input from "../components/signin/Input";
import SubHeading from "../components/signin/SubHeading";
import { SignupQuery } from "../store/axios";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

const Signup = () => {
  // const intialFormState = {
  //   firstName: { value: "", isValid: true },
  //   lastName: { value: "", isValid: true },
  //   email: { value: "", isValid: true },
  //   password: { value: "", isValid: true },
  // };

  const {
    value: firstName,
    hasError: firstNameIsValid,
    reset: firstNameReset,
    enteredValueHandller: firstNameChangeHandller,
    enteredValueBlurrHandller: firstNameBlurrHandller,
  } = useInput((value: string) => {
    return value === "" || value.length < 3;
  });
  const {
    value: lastName,
    hasError: lastNameIsValid,
    reset: lastNameReset,
    enteredValueHandller: lastNameChangeHandller,
    enteredValueBlurrHandller: lastNameBlurrHandller,
  } = useInput((value: string) => {
    return value === "" || value.length < 3;
  });
  const {
    value: email,
    hasError: emailIsValid,
    reset: emailReset,
    enteredValueHandller: emailChangeHandller,
    enteredValueBlurrHandller: emailBlurrHandller,
  } = useInput((value: string) => {
    return (
      value.trim() === "" ||
      value.length < 3 ||
      !value.includes("@") ||
      !value.includes(".")
    );
  });
  const {
    value: password,
    hasError: passwordIsValid,
    reset: passwordReset,
    enteredValueHandller: passwordChangeHandller,
    enteredValueBlurrHandller: passwordBlurrHandller,
  } = useInput((value: string) => {
    return value === "" || value.length < 3;
  });
  // const [form, setForm] = useState(intialFormState);
  const navigate = useNavigate();

  const signupHandller = async () => {
    if(firstNameIsValid | lastNameIsValid | emailIsValid | passwordIsValid){
      return
    }
    try {
      const { data, status } = await SignupQuery({
        username: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });

      if (status === 200 || status === 201) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
        return;
      }
    } catch (err) {
      console.log(err);
    }
    emailReset();
    firstNameReset();
    lastNameReset();
    passwordReset()
    window.alert("Unable to create account with these credentials!");
  };

  return (
    <Card>
      <Heading label={"Sign up"} />
      <SubHeading label={"Enter your information to create an account"} />
      <form>
        <Input
          label={"First Name"}
          inputId={"firstName"}
          placeholder={"John"}
          value={firstName}
          onChange={firstNameChangeHandller}
          onBlur={firstNameBlurrHandller}
          isValueValid={firstNameIsValid}
        />
        <Input
          label={"Last Name"}
          inputId={"lastName"}
          placeholder={"Doe"}
          value={lastName}
          onChange={lastNameChangeHandller}
          onBlur={lastNameBlurrHandller}
          isValueValid={lastNameIsValid}
        />
        <Input
          label={"Email"}
          inputId={"email"}
          placeholder={"pradeepjoshi@gmail.com"}
          value={email}
          onChange={emailChangeHandller}
          onBlur={emailBlurrHandller}
          isValueValid={emailIsValid}
        />
        <Input
          label={"Password"}
          inputId={"password"}
          placeholder={"123456"}
          value={password}
          type={"password"}
          onChange={passwordChangeHandller}
          onBlur={passwordBlurrHandller}
          isValueValid={passwordIsValid}
        />
        <Button label={"Signup"} onClick={signupHandller} />
      </form>
      <BottomWarning
        label={"Already have a account?"}
        buttonText="Sign in"
        to={"/signin"}
      />
    </Card>
  );
};

export default Signup;
