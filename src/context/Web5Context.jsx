import { Web5 } from "@web5/api/browser";
import React, { createContext, useEffect, useState } from "react";

export const Web5Context = createContext();

const ContextProvider = ({ children }) => {
  const [web5, setWeb5] = useState(null);
  const [did, setDid] = useState(null);
  useEffect(() => {
    const connectWeb5 = async () => {
      try {
        const { web5, did } = await Web5.connect();
        setWeb5(web5);
        setDid(did);
        console.log(did);
      } catch (error) {
        console.error(error);
      }
    };
    connectWeb5();
  }, []);

  const protocolDefinition = {
    protocol: "https://Fitbittesting2",
    published: true,
    types: {
      sharedWorkouts: {
        "schema": "https://schema.org/Fitbit/sharedtesting2",
        "dataFormats": ["application/json"]
      },
      myWorkouts: {
        "schema": "https://schema.org/Fitbit/mytesting2",
        "dataFormats": ["application/json"]
      }
    },
    structure: {
      sharedWorkouts: {
        $actions: [
          { "who": "anyone", "can": "write" },
          { "who": "recipient", "of": "sharedWorkouts", "can": "read" }
        ]
      },
      myWorkouts: {
        $actions: [
          { "who": "author", "of":"myWorkouts", "can": "read" },
          { "who": "author", "of":"myWorkouts", "can": "write" }
        ]
      }
    }
  }
  
  useEffect(() => {
    const installProtocol = async () => {
      try {
        console.log("Installing protocol ...");
        const { protocol, status } = await web5.dwn.protocols.configure({
          message: {
            definition: protocolDefinition,
          },
        });
        await protocol.send(did);
        console.log("Protocol installed successfully.");
      } catch (error) {
        console.error("Error installing protocol: : ", error);
      }
    };
    if (web5 && did) {
      installProtocol();
    }
  }, [web5, did]);



  const value = {
    web5,
    did,
    protocolDefinition,
  };

  return (
    <div>
      <Web5Context.Provider value={value}>{children}</Web5Context.Provider>
    </div>
  );
};

export default ContextProvider;