import { useEffect, useState } from "react";
import { useContext } from "react";
import { Web5Context } from "../utils/Web5Context";

const Home = () => {
  const { did, userType } = useContext(Web5Context);
  useEffect(() => {
    if (did) {
      console.log("The DID : ", did);
    }
  }, [did, userType]);
  return (
    <>
      <h1>Web 5.0 Setup</h1>
      <h4>{did}</h4>
    </>
  );
};

export default Home;
