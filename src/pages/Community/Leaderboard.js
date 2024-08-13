import React from "react";
import { useCollection } from "../../hooks/useCollection";
import "../DonateBlood/Camp.css";

export default function Leaderboard() {
  const { error, documents, count } = useCollection(
    "users",
    ["donation_count", ">=", 1], // Where clause: donation_count > 1
    ["donation_count", "desc"], // Order by clause: start with donation_count
    10 // Limit to 10 documents
  );

  return (
    <div className="camp-table">
      <div>
        <h1 className="heading">🏆 Leaderboard</h1>
      </div>

      <div className="title">
        <p>
          Here’s where we celebrate our top contributors and highest achievers.
          Check out the rankings to see who’s leading and get inspired to climb
          the ranks yourself! Keep up the great work and aim for the top!
        </p>
      </div>

      <hr />
      
      {!documents && <div className="loading">Loading Leaderboard.....</div>}

      <table className="camp-data-table">
        <thead>
          <tr className="camp-title-row">
            <th>Sr.No.</th>
            <th>Name</th>
            <th>Donation Score</th>
            <th>Donation Count</th>
          </tr>
        </thead>
        <tbody>
          {documents &&
            documents.map((user, index) => (
              <tr key={user.uid} className="camp-rows">
                <td>{index + 1}</td>
                <td style={{ whiteSpace: "pre-line" }}>{user.name}</td>

                <td>{user.donation_score}</td>
                {/* <td style={{ color: camp.availability.includes("Available,") ? "green" : "red" }}>
              {camp.availability}
            </td> */}
                <td>{user.donation_count}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
