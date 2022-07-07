import { useState } from "react";
import "./App.css";
import * as axios from "axios";

function App() {
  const [value, setValue] = useState("");
  const [repos, SetRepos] = useState([]);
  const [error, setError] = useState({});

  async function getRepos() {
    const query = value.toLowerCase().replace(/-/g, "");
    if (!query) return;
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`
      );
      SetRepos(response.data.items);
      if (response.data.items.length === 0) {
        throw new SyntaxError("Ничего не найдено О_о");
      } else setError({})
    } catch (e) {
      setError({
        value: true,
        message: e.message,
      });
    }
  }

  return (
    <div className="App">
      <h1>Поиск репозиториев GitHub</h1>
      <div className="searchbar">
        <input
          value={value}
          type="text"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
        <button className="btn" onClick={getRepos}>
          Поиск
        </button>
      </div>
      {error.value ? <div style={{ textAlign: "center" }}>{error.message}</div> : (
        <div className="repos">
          {repos.map((rep) => {
            return (
              <section className="repos-item" key={rep.id}>
                <h2>
                  <a href={rep.html_url} target="_blank" rel="noreferrer">
                    {rep.name}
                  </a>
                </h2>
                <h4>Language: {rep.language}</h4>
                <p>{rep.description}</p>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
