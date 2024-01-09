// userService.js

import { useContext, useState } from "react";
import { Web5Context } from "../context/Web5Context";

const WalletService = () => {
  const { web5, did, protocolDefinition} = useContext(Web5Context);
  const FitbitAppDID = "did:ion:EiDzsu0IqGgBiwSf7sapUs71b6-zfOLRoukfKXk5iMdsIg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoidFpLYy1PempIYThzbGhTSVBxSDNQZ3BCM0h2Y19WbFYxOHR0cWZnZHBiWSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJVa1ExV3FzMTdZWUZFOWZCaGMyODdvVEpCUl92d3ltVE1ETW9XZTkwSF9NIiwieSI6IkZDZldXbm5IaWtUUDUwSkZaM29CMGMySW9sZDU3VUN4ekFvLXhUc1hFSVEifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMCIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNCJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDYTJfZkxETEgzUHhtYkNpaTUwajk2akRFaXhtNktCLTN4RG1PUXo2aHJoQSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRGxWbG5yWTZlRzVSdHJDSE5ET0VFcy1qbXNJaTExUHdtZlhUUl9yTGd4eGciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUF1NDJHeGk5eXpyeFVxMjg0XzE1dTZwUXJCMmFnamNwWWYyQlg4QjRlU01RIn19";
  const userDid = "did:ion:EiCyYUaPbXGf0_JfQavkPEQx8Nv--AhsEQ1GUzTd3myTmA:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiM3hkd1lBRkV0WVZ3QlVLUDNQbGJzTVhKSVVFY09Cd3lnUjl2cWRRTUQ0QSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJyS2Q4Y0ZaZ0V6UW9NYlotOHppNDN6NzljbThaWWszU3VUbXpsVTZJYzBZIiwieSI6IlhOWENVdjZVQnNyTjBpUHN1TnRETHA2dzdSd0NkX3pnQW9UVlNMZWNLUUEifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDd0xsb0dyQzduS0N4dTd0eU5JVTAwOGNoWjFxbzBMTzBhaklLNWlxaVptUSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQXFtbkEtYTlycTloLUR2TWFGcHFHRjVNR1VSeFFjYWtpZDMtYlowWm9TdGciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUJhVVRhY2M3a0xUNENOX1BUeG44VHdCZWphX0Uzd0kwMTB4d3FDRi1PakZBIn19"
  const grantFitbitPermission = async () => {
    try {
      const { record} = await web5.dwn.records.write({
        "data": {
            "name": "role admin"
        },
        "message": {
            "recipient": FitbitAppDID,
            "protocol": protocolDefinition.protocol,
            "protocolPath": "fitbit",
            "schema": protocolDefinition.types.fitbit.schema,
            "dataFormat": "application/json",
        }
    });
    const {status: sendToFitbit} = await record.send(FitbitAppDID);
    console.log(record); 
    if(sendToFitbit.code !== 400) sonsole.log("Fitbit Role Assigned Successfully !") ; 
    return;
    } catch (error) {
      console.error("Error Getting UserWorkouts", error);
    }
  };

  const readUserWorkout = async() =>{
    try {
        const { record, status } = await web5.dwn.records.read({
            "from": userDid,
            "message": {
              "protocol": protocolDefinition.protocol,
              "protocolPath": "userworkout",
              "schema": protocolDefinition.types.userworkout.schema,
              "dataFormat": "application/json",
          }
      });
      console.log(record);
      console.log(status);

      return record;
      } catch (error) {
        console.error("Error Getting Workouts", error);
      }
  }
  const readAllWorkouts = async () => {
    const userworkout = await readUserWorkout();
    console.log("HEHEHEHEHEHEHEHE");
    
  };

  return {
    grantFitbitPermission,
    readAllWorkouts,
  };
};

export default WalletService;
