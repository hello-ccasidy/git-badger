import React, {useState, useEffect} from "react"
import { Link, Outlet, useParams} from "react-router-dom";


export default function User() {
    let params = useParams(); 

    // User
    const [user, setUser] = useState(null);

    // Repos
    const [repos, setRepos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // User API
    useEffect(() => {
      fetch(`https://api.github.com/users/${params.uname}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        console.log(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
    }, []);

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
          setRepos(data);
          console.log(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setRepos(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);



    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };
  
    return (
      <div style={{ display: "flex" }}>
        <div className="profile-data" onClick={() => openInNewTab(user.html_url)}>
          {user && 
            <>
              <h2>{`${user.name}`}</h2>
              <img src={user.avatar_url} />
            </>
          }
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