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

  const protocolDefinition = 
  {
    "protocol": "https://user.com",
    "published": true,
    "types": {
        "fitbit": {
            "schema": "https://schema.org/user/fitbit",
            "dataFormats": ["application/json"]
        },
        "userworkout": {
            "schema": "https://schema.org/user/userworkout",
            "dataFormats": ["application/json"]
        },
        "workout": {
            "schema": "https://schema.org/user/workout",
            "dataFormats": ["application/json"]
        },
        "exercise": {
            "schema": "https://schema.org/user/exercise",
            "dataFormats": ["application/json"]
        }
    },
    "structure": {
        "fitbit": {
            "$globalRole": true
        },
        "userworkout": {
            "workout": {
                "exercise": {
                    "$actions": [
                        {
                            "who": "recipient",
                            "of": "workout",
                            "can": "write"
                        },
                        {
                            "who": "recipient",
                            "of": "workout",
                            "can": "read"
                        },
                        {
                            "role": "fitbit",
                            "can": "read"
                        }
                    ]
                },
                "$actions": [
                    {
                        "who": "author",
                        "of": "workout",
                        "can": "write"
                    },
                    {
                        "who": "recipient",
                        "of": "workout",
                        "can": "read"
                    },
                    {
                        "role": "fitbit",
                        "can": "read"
                    }
                ]
            },
            "$actions": [
                {
                    "who": "author",
                    "of": "userworkout",
                    "can": "write"
                },
                {
                    "role": "fitbit",
                    "can": "read"
                }
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