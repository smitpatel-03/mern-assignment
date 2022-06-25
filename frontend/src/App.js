import "./App.css";
import UserList from "./components/UserList";
import NotFound from "./components/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import Verification from "./components/Verification";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<UserList />} />
          <Route exact path="/user/verify/:token" element={<Verification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
