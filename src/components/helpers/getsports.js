import React from 'react';
import Async from 'react-async';

// We'll request user data from this API
const loadUsers = () =>
  fetch("https://d21xmla0sqnlu7.cloudfront.net/Sports/Soccer/result/result_2019_550.json")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

function GetSports() {
  return (
    <div className="container">
      <Async promiseFn={loadUsers}>
        {({ data, err, isLoading }) => {
          if (isLoading) return "Loading..."
          if (err) return `Something went wrong: ${err.message}`
          if (data) {
            console.log(data.APIinfo[0])
            return (
              <div>
                <div>
                  <h2>React Async - Random Users</h2>
                </div>
                {data.APIinfo[0].FixtureInfo.map(FixtureInfo=> (
                  <div key={FixtureInfo.MatchID} className="row">
                    <div className="col-md-12">
                      <p>{FixtureInfo.MatchID}</p>
                      <p>{FixtureInfo.HomeScore}</p>
                      <p>{FixtureInfo.AwayScore}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          }  
        }}
      </Async>
    </div>
  );
}

export default GetSports;
