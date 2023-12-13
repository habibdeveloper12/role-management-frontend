import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";

import SignUp from "./Pages/SignUp/SignUp";
import RequireAuth from "./hooks/RequireAuth/RequireAuth";
import Table from "./Pages/Table/Table";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Table></Table>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/table"
          element={
            <RequireAuth>
              <Table></Table>
            </RequireAuth>
          }
        ></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Home></Home>}></Route>
      </Routes>
    </div>
  );
}

export default App;
