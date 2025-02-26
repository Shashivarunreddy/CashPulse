import axios from "axios"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e) =>{
          setFirstName(e.target.value);
        }} placeholder="shashi" label={"First Name"} />
        <InputBox onChange={(e)=>{
          setLastName(e.target.value);
        } } placeholder="varun" label={"Last Name"} />
        <InputBox onChange={(e)=>{
          setUserName(e.target.value);
        }} placeholder="shashivarun@gmail.com" label={"Email"} />
        <InputBox onChange={(e)=>{
          setPassword(e.target.value);
        }} placeholder="*******" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async ()=>{
            try {
              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                firstName,
                lastName,
                userName,
                password
              }, {
                headers: {
                  "Content-Type": "application/json"
                }
              });
          
              // Store token if the response is successful
              localStorage.setItem("token", response.data.token);
              
          
            } catch (error) {
              console.error("Signup failed:", error.response ? error.response.data : error.message);
            }
            navigate("/dashboard");
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}