import React from 'react';
import {Route, Routes} from "react-router";
import Login from "./routes/Login";
import HomeLayout from "./layouts/Home.layout";
import Home from "./routes/Home";

export default function App() {
  return <Routes>
    <Route element={<HomeLayout></HomeLayout>}>
      <Route path="/" element={<Home></Home>}></Route>
    </Route>
    <Route path="/login" element={<Login></Login>}></Route>
  </Routes>
}
