import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { fetchUsers } from "./utils/api"; // นำเข้า API ที่แยกไว้

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetchUsers().then((d) => {
      setData(d.message);
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. {data}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
