import { configureStore } from "@reduxjs/toolkit";

import reducer from './covidStats';


export default function () {
  return configureStore({ reducer });
};