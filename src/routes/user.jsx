import React, {useState, useEffect} from "react"
import { Link, Outlet, useParams} from "react-router-dom";


export default function User() {
    let params = useParams(); 

    const [repos, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        fetch(`https://api.github.com/users/${params.uname}/repos`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          console.log(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);


    return (
      <div style={{ display: "flex" }}>
        <div>
            <h1>{params.uname}</h1>
        </div>
        <Outlet />
        {loading && <div>Please wait a moment as we generate your card...</div>}
        {error && (
            <div>{`There is an issue fetching GitHub API data- ${error}`}</div>
        )}
        <ul>
            {repos && (
                    repos.map(({ id, name }) => (
                        <li key={id}>
                        <h3>{name}</h3>
                        </li>
            )))}
        </ul>
      </div>
    );
  }