import { useEffect, useState, useContext} from "react";
import { Web5Context } from "../utils/Web5Context";


const Home = () => {
  const pd1 = {
    protocol: "https://fitbit.org/protocol",
    published: true,
    types: {
      users: {
        schema: "https://schema.org/Fitbit",
        dataFormats: ["application/json"],
      },
    },
    structure: {
      users: {
        $actions: [
          { who: "anyone", can: "write" },
          { who: "anyone", can: "read" },
        ],
      }
    },
  };
  const pd2 = {
    protocol: "https://fitbit.org/protocol",
    published: true,
    types: {
      users: {
        schema: "https://schema.org/Fitbit",
        dataFormats: ["application/json"],
      },
    },
    structure: {
      users: {
        $actions: [
          { who: "author", of: "users", can: "write" },
          { who: "anyone", can: "read" },
        ],
      }
    },
  };
  const { web5, did } = useContext(Web5Context);
  useEffect(() => {
    const installProtocol = async () => {
      try {
        console.log("Installing protocol ...");
        const { protocol, status } = await web5.dwn.protocols.configure({
          message: {
            definition: pd1,
          },
        });
        await protocol.send(did);
        console.log("Protocol installed successfully.");
      } catch (error) {
        console.error("Error installing protocol: : ", error);
      }
    }
    installProtocol();
  }, [web5, did]);

  async function updateProtocol(){
    try {
      console.log("Installing protocol ...");
      const { protocol, status } = await web5.dwn.protocols.configure({
        message: {
          definition: pd2,
        },
      });
      await protocol.send(did);
      console.log("Protocol installed successfully.");
    } catch (error) {
      console.error("Error installing protocol: : ", error);
    }
  }

  async function getProtocol(){
    const { protocols, status } = await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: 'https://fitbit.org/protocol',
        },
      },
    });
  
    // logs an array of protocol configurations installed on the user's DWN
    console.log(protocols);
  }

  const [allWorkout, setAllWorkout] = useState([]);
  const [workout, setWorkout] = useState({
    workoutName: '',
    repTime: '',
    repetitions: '',
    completed: false,
    workoutType: 'other',
  });

  const getAllWorkouts = async() => {
    const { records } = await web5.dwn.records.query({message: {
      filter:{
        schema: "https://schema.org/Fitbit",
      }  
    }});
    const newList = await Promise.all(records.map(async (record) => {
      const data = await record.data.json();
      return { record, data, id: record.id };
    }));

    setAllWorkout(newList);
    
  }
  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const addWorkout = async () => {
    try {
      const { record } = await web5.dwn.records.write({
        data: { ...workout },
        message: {
          schema: "https://schema.org/Fitbit",
          dataFormat: 'application/json'
        },
      });
      const {status} = await record.send(did);
      console.log(status);
      alert("Workout Created Successfully !")
    } catch (error) {
      alert("Workout Not Created ... ")
      console.error("Error Creating Workout : ", error);
    }
    
  };

  const handleDeleteWorkout = async (workoutRecord) => {
    try {
      // Find the index of the workout to be deleted
      const index = allWorkout.findIndex((record) => record.id === workoutRecord.id);
  
      if (index !== -1) {
        // Create a new array without the deleted workout
        const newList = [...allWorkout];
        newList.splice(index, 1);
        setAllWorkout(newList);
  
        // Delete the record in DWN
        await web5.dwn.records.delete({
          message: {
            recordId: workoutRecord.id,
          },
        });
  
        console.log(`Deleted workout with record ID: ${workoutRecord.id}`);
      } else {
        console.error("Workout not found for deletion");
      }
    } catch (error) {
      console.error("Error deleting workout: ", error);
    }
  };

  const handleUpdateWorkout = async (workoutRecord) => {
    console.log("Hehe");

    const index = allWorkout.findIndex((record) => record.id === workoutRecord.id);
    allWorkout[index].data.completed = !allWorkout[index].data.completed ;

    

  // Get record in DWN
    const { record } = await web5.dwn.records.read({
      message: {
        filter: {
          recordId: workoutRecord.id
        }
      }
    });

  // Update the record in DWN
    await record.update({ data: allWorkout[index].data });
  };
  


  const handleFormSubmit = (e) => {
    e.preventDefault();
    addWorkout();
    console.log("Create Workout Successful !")
  }


  return (
    <>
      <h1>Welcome to the FitBit !</h1>
      <button onClick={getProtocol}>Log Protocol</button>
      <button onClick={updateProtocol}>Update Protocol</button>
      <div style={{ display: 'flex', height: '70vh', margin: '0 auto', maxWidth: '70%', border: '1px solid #ccc', borderRadius: '5px' }}>
      <div style={{ width: '50%', borderRight: '1px solid #ccc', padding: '20px' }}>
        <h2>Add Workout</h2>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Workout Name:
              <input
                type="text"
                id="workoutName"
                name="workoutName"
                required
                value={workout.workoutName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Rep Time (in seconds):
              <input
                type="number"
                id="repTime"
                name="repTime"
                required
                value={workout.repTime}
                onChange={handleChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Number of Repetitions:
              <input
                type="number"
                id="repetitions"
                name="repetitions"
                required
                value={workout.repetitions}
                onChange={handleChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Type of Workout:
              <select
                name="workoutType"
                id="workoutType"
                required
                value={workout.workoutType}
                onChange={handleChange}
              >
                <option value="cardio">Cardio</option>
                <option value="strength">Strength</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div>
            <button type="submit">Add Workout</button>
          </div>
        </form>
      </div>
      
      <div>
            <button type="submit" onClick={getAllWorkouts}>Get Workouts</button>
      </div>


      {/* Right side - List of Workouts */}
      <div style={{ width: '50%', padding: '20px' }}>
  <h2>Workout List</h2>
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {allWorkout.map(({ record, data, id }, index) => (
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
          <strong>{data.workoutName}</strong> - {data.repTime} seconds, {data.repetitions} repetitions, {data.workoutType}
        </div>
        <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
          <button onClick={() => handleUpdateWorkout(record)} style={{ marginLeft: '10px' }}>
            Done
          </button>
          <button onClick={() => handleDeleteWorkout(record)} style={{ marginLeft: '10px' }}>
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

export default Home;
