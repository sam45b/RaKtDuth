import { useState } from "react";
import Select from "react-select";
import { states, Districts,genders } from "../Data/Data";
import './Camp.css';
import {useHistory} from "react-router-dom"
import {useFirestore} from "../../hooks/useFirestore"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDocument } from '../../hooks/useDocument';

export default function DonateBlood() {
  const {user} = useAuthContext();


  const {addDocument} = useFirestore("doner_registered")
  const { document, error } = useDocument('users', user.uid);

  const history = useHistory();

  const [state, setState] = useState("");
  const [District, setDistrict] = useState("");
  const [Date, setDate] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [campsData, setCampsData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [name,setName] = useState("");
  const [age,setAge] = useState();
  const [gender,setGender] = useState();
  const [mobile,setMobile]=useState();
  const [email,setEmail] = useState();
  const [address,setAddress] = useState();


  // const url = `https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYCAMPS&stateCode=${state.value}&districtCode=${state.value && Districts[state.value][0]?.value-1}&campDate=${Date}&_=1707901087796`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);


    const donar = {
      name,
      age,
      gender:gender.value,
      mobile,
      email,
      address,
      district:District.label,
      state:state.label,
      uid:user.uid,
      profileImg: document?.profileURL || '' // Use optional chaining (?.) to safely access profileURL

    }
    // console.log(donar)

    await addDocument(donar);


    history.push("/donate/success")

    
    
    
    // try {
    //   const response = await fetch(url);

    //   if (!response.ok) {
    //     throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    //   }

    //   const data = await response.json();

    //   if (data && data.data && data.data.length > 0) {
    //     setIsData(false);

    //     // Process the data and update the state
    //     const formattedData = data.data.map((camp) => ({
    //       campID: camp[0],
    //       date: camp[1],
    //       location: camp[2],
    //       district: camp[5],
    //       contact: camp[6],
    //       organizer: camp[7],
    //       coordinator: camp[8],
    //       registrationLink: camp[9],
    //       time: camp[10],
    //     }));

    //     setCampsData(formattedData);
    //   } else {
    //     setIsData(true);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }



    setIsPending(false);
  };

  const customNoOptionsMessage = ({ inputValue }) => {
    return inputValue ? `No options` : "Select a state";
  };

  return (
    <>
      <form className="donate-blood" onSubmit={handleSubmit}>
        <h3>Registration for Blood Donation</h3>


        <label>
          <span>Name:</span>
          <input 
          type="text"
          onChange={(e)=>{setName(e.target.value)}}
          value={name}
          />
        </label>


        <label>
          <span>Age:</span>
          <input 
          type="number"
          min="18"
          max="60"
          onChange={(e)=>{setAge(e.target.value)}}
          value={age}
          required
          />
        {age<18 || age>60?<p className="error">donar must be between 18-60</p>:<p></p>}
        </label>

        <label>
          <span>Gender:</span>
          <Select
            onChange={(option) => {
              setGender(option);
            }}
            options={genders}
            placeholder="Select Gender"
            required
          />
        </label>

        <label>
          <span>Mobile:</span>
          <input 
          type="number"
          onChange={(e)=>{setMobile(e.target.value)}}
          value={mobile}
          />
        </label>

        <label>
          <span>Email:</span>
          <input 
          type="email"
          onChange={(e)=>{setEmail(e.target.value)}}
          value={email}
          />
        </label>

        <label>
          <span>Address:</span>
          <input 
          type="text"
          onChange={(e)=>{setAddress(e.target.value)}}
          value={address}
          />
        </label>
        <label>
          <span>State:</span>
          <Select
            onChange={(option) => {
              setState(option);
            }}
            options={states}
            placeholder="Select State"
            required
          />
        </label>

        <label>
          <span>District:</span>
          <Select
            onChange={(option) => setDistrict(option)}
            options={Districts[state?.value] || []}
            placeholder="Select District"
            noOptionsMessage={customNoOptionsMessage}
            required
          />
        </label>

        
        {/* <label>
          <span>Date:</span>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={Date}
            // min={formattedDate}
            required
          />
        </label> */}

        {!isPending && <button>Register</button>}
        {isPending && <button disabled>Loading..</button>}
      </form>

      
    </>
  );
}
