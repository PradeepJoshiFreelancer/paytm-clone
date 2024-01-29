import { useState } from "react";
import Button from "../components/signin/Button";
import { BottomWarning } from "../components/signin/ButtonWarning";
import Card from "../components/signin/Card";
import Heading from "../components/signin/Heading";
import Input from "../components/signin/Input";
import SubHeading from "../components/signin/SubHeading";
import { SignupQuery } from "../store/axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const intialFormState = {
    firstName: { value: "", isValid: true },
    lastName: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
  };
  const [form, setForm] = useState(intialFormState);
  const navigate = useNavigate();

  const signupHandller = async () => {
    if (form.firstName.value === "" || form.firstName.value.length < 3) {
      setForm((prevData) => {
        return {
          ...prevData,
          firstName: { value: prevData.firstName.value, isValid: false },
        };
      });
      return;
    }
    if (form.lastName.value === "" || form.lastName.value.length < 3) {
      setForm((prevData) => {
        return {
          ...prevData,
          lastName: { value: prevData.lastName.value, isValid: false },
        };
      });
      return;
    }
    if (
      form.email.value === "" ||
      form.email.value.length < 3 ||
      !form.email.value.includes("@") ||
      !form.email.value.includes(".")
    ) {
      setForm((prevData) => {
        return {
          ...prevData,
          lastName: { value: prevData.firstName.value, isValid: false },
        };
      });
      return;
    }
    if (form.password.value === "" || form.password.value.length < 3) {
      setForm((prevData) => {
        return {
          ...prevData,
          password: { value: prevData.password.value, isValid: false },
        };
      });
      return;
    }
    try {
      const { data, status } = await SignupQuery({
        username: form.email.value,
        password: form.password.value,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
      });

      if (status === 200 || status === 201) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
        return;
      }
    } catch (err) {
      console.log(err);
    }
    setForm(intialFormState);
    window.alert("Invalid Credential");
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
          value={form.firstName.value}
          onChange={(e) => {
            setForm((prevData) => {
              return {
                ...prevData,
                firstName: { value: e.target.value, isValid: true },
              };
            });
          }}
        />
        {!form.firstName.isValid && (
          <p className="text-red-500 text-sm fort-bold text-left">
            First Name should be greater than 3 charecters.
          </p>
        )}
        <Input
          label={"Last Name"}
          inputId={"lastName"}
          placeholder={"Doe"}
          value={form.lastName.value}
          onChange={(e) => {
            setForm((prevData) => {
              return {
                ...prevData,
                lastName: { value: e.target.value, isValid: true },
              };
            });
          }}
        />
        <Input
          label={"Email"}
          inputId={"email"}
          placeholder={"pradeepjoshi@gmail.com"}
          value={form.email.value}
          onChange={(e) => {
            setForm((prevData) => {
              return {
                ...prevData,
                email: { value: e.target.value, isValid: true },
              };
            });
          }}
        />
        <Input
          label={"Password"}
          inputId={"password"}
          placeholder={"123456"}
          value={form.password.value}
          type={"password"}
          onChange={(e) => {
            setForm((prevData) => {
              return {
                ...prevData,
                password: { value: e.target.value, isValid: true },
              };
            });
          }}
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
