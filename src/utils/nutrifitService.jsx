import { useContext, useState } from "react";
import { Web5Context } from "../context/Web5Context";
import { useNavigate } from "react-router-dom";

const NutrifitService = () => {
    const { web5, did, protocolDefinition} = useContext(Web5Context);
    const navigate = useNavigate();

    const getUserMeal = async() => {
        try {
          const { records, status } = await web5.dwn.records.query({
            message: {
              protocol: protocolDefinition.protocol,
              filter: {
                protocolPath: "usermeal",
                schema: protocolDefinition.types.usermeal.schema,
              },
            },
          });
          console.log(status);
          const newList = await Promise.all(
            records.map(async (record) => {
              const data = await record.data.json();
              return { record, data, id: record.id };
            })
          );    
          return newList;
      
        } catch (error) {
          console.error("Error Getting Usermeals", error);
        }
    };

    const createUserMeal = async() => {
        try {
            const { record } = await web5.dwn.records.write({
                "data": {
                    "name": "usermeal"
                },
                "message": {
                    "published": true,
                    "protocol": protocolDefinition.protocol,
                    "protocolPath": "usermeal",
                    "schema": protocolDefinition.types.usermeal.schema,
                    "dataFormat": "application/json"
                }
            });
            const {status} = await record.send(did);
            console.log(status);
        } catch (error) {
            console.error("Error Creating Usermeal : ", error);
        }    
    };

    const createMeal = async(mealdata) => {
        const usermeal = await getUserMeal();
        try {
            const {record} = await web5.dwn.records.write({
                "data": mealdata,
                "message": {
                    "published": true,
                    "parentId": usermeal[0].id,
                    "contextId": usermeal[0].id,
                    "protocol": protocolDefinition.protocol,
                    "protocolPath": "usermeal/meal",
                    "schema": protocolDefinition.types.meal.schema,
                    "dataFormat": "application/json"
                }
            });
            const {status} = await record.send(did);
            console.log("create meal status:", record, status);
            return record;
        } catch (error) {
            console.error("Error Creating meal : ", error);
        }    
    };

    const createFood = async(foodData, mealRecordId) => {
        const usermeal = await getUserMeal();
        try {
            const { record } = await web5.dwn.records.write({
                "data": foodData,
                "message": {
                    "published": true,
                    "parentId": mealRecordId,
                    "contextId": usermeal[0].id,
                    "protocol": protocolDefinition.protocol,
                    "protocolPath": "usermeal/meal/food",
                    "schema": protocolDefinition.types.food.schema,
                    "dataFormat": "application/json"
                }
            });
            const {status} = await record.send(did);
            console.log(status);
            return record;
        } catch (error) {
            console.error("Error Creating Food : ", error);
        }    
    };

    const getRecordsWithParentId = async(parentID, DID) => {
        try {
            const { records, status } = await web5.dwn.records.query({
              from: DID,
              message: {
                protocol: protocolDefinition.protocol,
                filter: {
                  parentId: parentID
                },
              },
            });
            console.log(records, status);
            const newList = await Promise.all(
              records.map(async (record) => {
                const data = await record.data.json();
                return { record, data, id: record.id };
              })
            );    
            return newList;
        
          } catch (error) {
            console.error("Error Getting with parent Id", error);
          }
    };

    const queryMealRecords = async(DID) => {
      try {
        const { records, status } = await web5.dwn.records.query({
          from: DID,
          message: {
            filter: {
              schema: protocolDefinition.types.meal.schema,
            },
          },
        });
        console.log(records, status);
        const newList = await Promise.all(
          records.map(async (record) => {
            const data = await record.data.json();
            return { record, data, id: record.id };
          })
        );    
        return newList;
    
      } catch (error) {
        console.error("Error Getting Meals", error);
      }
    }

    const queryAllFoodRecords = async(DID) => {
      try {
        const {records, status} = await web5.dwn.records.query({
          from: DID,
          message: {
            filter: {
              schema: protocolDefinition.types.food.schema,
            }
          },
        });
        console.log(status);
        const newList = await Promise.all(
          records.map(async (record) => {
            const data = await record.data.json();
            return { record, data, id: record.id };
          })
        );
        return newList;
      } catch (error) {
        console.error("Error Getting All Food", error);
      }
    }

    const queryFoodRecords = async(parentID, DID) => {
      try {
        const { records, status } = await web5.dwn.records.query({
          from: DID,
          message: {
            filter: {
              parentId: parentID,
              schema: protocolDefinition.types.food.schema,
            },
          },
        });
        console.log(records, status);
        const newList = await Promise.all(
          records.map(async (record) => {
            const data = await record.data.json();
            return { record, data, id: record.id };
          })
        );    
        return newList;
    
      } catch (error) {
        console.error("Error Getting Food with parentId", error);
      }
    }

    const deleteWithRecordId = async (RecordId) => {
      try {
        await web5.dwn.records.delete({
          message: {
            protocol: protocolDefinition.protocol,
            recordId: RecordId,
          },
        });
        console.log("record deleted successfully")
      } catch (error) {
        console.error("Error Deleting with RecordId: ", error);
      }
    };

    const createRecFood = async(foodData, userDid) => {
      try {
          const response = await web5.dwn.records.write({
              "data": foodData,
              "message": {
                  "protocol": protocolDefinition.protocol,
                  "protocolPath": "usermeal/meal/food",
                  "schema": protocolDefinition.types.food.schema,
                  "dataFormat": "application/json"
              }
          });
          console.log("rec" ,response);
          const {status} = await record.send(userDid);
          // console.log(status);
          return record;
      } catch (error) {
          console.error("Error Creating Rec Food : ", error);
      }    
  };

  return {
    getUserMeal,
    createUserMeal,
    createMeal,
    createFood,
    getRecordsWithParentId,
    queryMealRecords,
    queryFoodRecords,
    queryAllFoodRecords,
    deleteWithRecordId,
    createRecFood
  };
};

export default NutrifitService;
