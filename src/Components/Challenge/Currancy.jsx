import React, {  useState } from "react";
import axios from "axios";
import {useForm} from 'react-hook-form'

const CurrencyConverter = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [rate, setRates] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    let formdata=(data)=>{
        console.log(data)
    }
const getRate = (first, second) => {
    axios({
      method: "GET",
      url: `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=5a49beefa5e7696bc287`,
    })
      .then((response) => {
        console.log(response.data);

        setRates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70px",
          width: "100%",
          backgroundColor: "#cdff63",
          fontSize: "30px",
          color: "blue",
        }}
      >
        Currency Converter PRO
      </div>
      <div
        style={{ height: "5px", width: "100%", backgroundColor: "#9ffe36" }}
      ></div>
      <br />
      <div style={{ marginLeft: "33%" }}>
        <div
          style={{
            height: "150px",
            width: "400px",
            backgroundColor: "#94e5ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "25px",
          }}
        >
          1 {first} = {rate[`${first}_${second}`]} {second}
        </div>
        <br />
      </div>
      <div id="my-form">
        <form className='my form'onSubmit={handleSubmit(formdata)} id="form">
            <div>
                <input type="text" placeholder='UserName' 
                className={errors.username?.message?"err-border":null}
                {...register("username",{required:{value:true,message:"Username Is mandatory"},
                minLength:{value:6,message:"Username Minimum 6 Chracters"},
                maxLength:{value:10,message:"Username maximum 10 Characters"},
                pattern:{value:/^[a-zA-Z]+$/g,message:"Username Should Contains Only Alphabatics"}})}/>
            </div>
            <div className='err-massage'>
                {errors.username?.message}

            </div>

           <div>
            <input type="email" placeholder='Email'
            {...register("email",{required:{value:true,message:"Email is Mandatory"}})} 
            />
            <div className='err-massage'>
                {errors.email?.message}
            </div>
           </div>
           <input
          type="text"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
        <input
          type="text"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
        />
        <br />
        <button
          onClick={() => {
            getRate(first, second);
          }}
        >
          Submit
        </button>
           </form>
           </div>
    </>
  );
};
export default CurrencyConverter;