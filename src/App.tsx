import React from 'react';
import {Route, Routes} from "react-router";
import Login from "./routes/Login";
import HomeLayout from "./layouts/Home.layout";
import Home from "./routes/Home";
import Favorites from "./routes/Favorites";

export default function App() {
  return <Routes>
    <Route element={<HomeLayout></HomeLayout>}>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/favorites" element={<Favorites></Favorites>}></Route>
    </Route>
    <Route path="/login" element={<Login></Login>}></Route>
  </Routes>
}
