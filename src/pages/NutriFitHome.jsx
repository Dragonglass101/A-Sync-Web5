import { useEffect, useState, useContext} from "react";
import { Web5Context } from "../utils/Web5Context";
// import {publicDid} from "../utils/constants"


const NutriFitHome= () => {
  const { web5, did, protocolDefinition} = useContext(Web5Context);
  useEffect(() => {
    if (did) {
      console.log("The DID : ", did);
    }
  }, [web5, did, protocolDefinition]);

  const [allMeals, setAllMeals] = useState([]);
  const [meal, setMeal] = useState({
    mealName: '',
    time: '',
    dish: '',
    completed: false,
    calorie: 0,
    mealType: 'other',
  });

  const calculateCalorie = (time, dish) => {
    return time * dish;
  };

  const getAllMeals = async() => {
    const { records } = await web5.dwn.records.query({message: {
      filter:{
        protocol: protocolDefinition.protocol,
        schema: protocolDefinition.types.NutriFit.schema,
      }  
    }});
    const newList = await Promise.all(records.map(async (record) => {
      const data = await record.data.json();
      return { record, data, id: record.id };
    }));

    setAllMeals(newList);
    
  }
  const handleChange = (e) => {
    setMeal({
      ...meal,
      [e.target.name]: e.target.value,
    });
  };

  const addMeal = async () => {
    try {
      meal.calorie = calculateCalorie(meal.time, meal.dish);
      const { record } = await web5.dwn.records.write({
        data: { ...meal },
        message: {
          sprotocol: protocolDefinition.protocol,
          schema: protocolDefinition.types.NutriFit.schema,
          dataFormat: 'application/json'
        },
      });
      const {status} = await record.send(did);
      console.log(status);
      alert("Meal Created Successfully !")
    } catch (error) {
      alert("Meal Not Created ... ")
      console.error("Error Creating Meal : ", error);
    }
    
  };

  const handleDeleteMeal = async (mealRecord) => {
    try {
      // Find the index of the meal to be deleted
      const index = allMeals.findIndex((record) => record.id === mealRecord.id);
  
      if (index !== -1) {
        // Create a new array without the deleted meal
        const newList = [...allMeals];
        newList.splice(index, 1);
        setAllMeals(newList);
  
        // Delete the record in DWN
        await web5.dwn.records.delete({
          protocol: protocolDefinition.protocol,
          schema: protocolDefinition.types.NutriFit.schema,
          message: {
            recordId: mealRecord.id,
          },
        });
  
        console.log(`Deleted meal with record ID: ${mealRecord.id}`);
      } else {
        console.error("meal not found for deletion");
      }
    } catch (error) {
      console.error("Error deleting meal: ", error);
    }
  };

  const handleUpdateMeal = async (mealRecord) => {
    console.log("Hehe");

    const index = allMeals.findIndex((record) => record.id === mealRecord.id);
    allMeals[index].data.completed = !allMeals[index].data.completed ;

    

  // Get record in DWN
    const { record } = await web5.dwn.records.read({
      message: {
        protocol: protocolDefinition.protocol,
        schema: protocolDefinition.types.NutriFit.schema,
        filter: {
          recordId: mealRecord.id
        }
      }
    });

  // Update the record in DWN
    await record.update({ data: allMeals[index].data });
  };
  


  const handleFormSubmit = (e) => {
    e.preventDefault();
    addMeal();
    console.log("Create Doctor Working Successfully !")
  }


  return (
    <>
      <h1>Welcome to the NutriFit !</h1>
     
      <div style={{ display: 'flex', height: '70vh', margin: '0 auto', maxWidth: '70%', border: '1px solid #ccc', borderRadius: '5px' }}>
      <div style={{ width: '50%', borderRight: '1px solid #ccc', padding: '20px' }}>
        <h2>Add meal</h2>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Meal Name:
              <input
                type="text"
                id="mealName"
                name="mealName"
                required
                value={meal.mealName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Time (in seconds):
              <input
                type="number"
                id="time"
                name="time"
                required
                value={meal.time}
                onChange={handleChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Number of dish:
              <input
                type="number"
                id="dish"
                name="dish"
                required
                value={meal.dish}
                onChange={handleChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Type of meal:
              <select
                name="mealType"
                id="mealType"
                required
                value={meal.mealType}
                onChange={handleChange}
              >
                <option value="carbsMajor">Carb</option>
                <option value="fatMajor">Fat</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div>
            <button type="submit">Add meal</button>
          </div>
        </form>
      </div>
      
      <div>
            <button type="submit" onClick={getAllMeals}>Get meals</button>
      </div>


      {/* Right side - List of meals */}
      <div style={{ width: '50%', padding: '20px' }}>
        <h2>meal List</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {allMeals.map(({ record, data, id }, index) => (
            <li
              key={index}
              style={{
                marginBottom: '15px',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                position: 'relative',
                backgroundColor: data.completed ? 'green' : 'red', // Set background color based on data.completed
              }}
            >
              <div>
                <strong>{data.mealName}</strong> 
              </div>
              <div style={{ marginTop: '10px' }}>
                <strong style={{ fontSize: '16px' }}>Calorie:</strong>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5px' }}>{data.calorie}</div>
              </div>
              <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                <button onClick={() => handleUpdateMeal(record)} style={{ marginLeft: '10px' }}>
                  Done
                </button>
                <button onClick={() => handleDeleteMeal(record)} style={{ marginLeft: '10px' }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default NutriFitHome;
