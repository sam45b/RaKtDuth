import "./Statistics.css";
import { useCollection } from "../../hooks/useCollection";

import React from 'react'

function Statistics() {

  const {count } = useCollection("users");
  const { count:registrationsCount} = useCollection("allDonars");
  const { count:campCount} = useCollection("camps");

  


  return (
    <div className="statistics">
      <h1>Statistics</h1>

      <div className="items">
      
      <div className="statistics-item item1">
          <h2>Total Donars</h2>
          <h1>{registrationsCount}</h1>
      </div>
      <div className="statistics-item item2">
          <h2>Total Camps</h2>
          <h1>{campCount}</h1>
      </div>
      <div className="statistics-item item3">
          <h2>Total Users</h2>
          <h1>{count}</h1>
      </div>

    </div>

    </div>
    
  );
}

export default Statistics;
