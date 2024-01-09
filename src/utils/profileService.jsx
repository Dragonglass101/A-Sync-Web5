import { useContext } from "react";
import { Web5Context } from "../context/Web5Context";

const ProfileService = () => {
    const { web5, did, protocolDefinition} = useContext(Web5Context);

    const getProfile = async() => {
        try {
          const { records, status } = await web5.dwn.records.query({
            message: {
              protocol: protocolDefinition.protocol,
              filter: {
                protocolPath: "profile",
                schema: protocolDefinition.types.profile.schema,
              },
            },
          });
          const newList = await Promise.all(
            records.map(async (record) => {
              const data = await record.data.json();
              return { record, data, id: record.id };
            })
          );    
          return newList;
      
        } catch (error) {
          console.error("Error Getting Workouts", error);
        }
    };

    const createProfile = async(profileData) => {
        try {
            const {record} = await web5.dwn.records.write({
                "data": profileData,
                "message": {
                    "protocol": protocolDefinition.protocol,
                    "protocolPath": "profile",
                    "schema": protocolDefinition.types.profile.schema,
                    "dataFormat": "application/json"
                }
            });
            const {status} = await record.send(did);
        } catch (error) {
            console.error("Error Creating Profile : ", error);
        }    
    };

  return {
    getProfile,
    createProfile
  };
};

export default ProfileService;
