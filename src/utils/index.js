import dateFns from "date-fns/format";
import id from "date-fns/locale/id";
import jwtDecode from 'jwt-decode';
import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import keyStorage from "values/keyStorage";
import { CURRENT_USER_KEY, TOKEN_KEY } from "./constant";

const setDataToStorage = (key, data) => {
  localStorage.setItem(key, data);
};

const getDataFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    if (data === null || data === undefined || data === 'undefined') {
      return null;
    }

    return data;
  } catch (err) {
    console.log(err);
  }

  return null;
};

const removeFromLocalStorage = (key) => {
  if (Array.isArray(key)) {
    key.forEach((val) => {
      localStorage.removeItem(val);
    });
  } else {
    localStorage.removeItem(key);
  }
};

const isAuthenticated = () => {
  const currentUser = localStorage.getItem(keyStorage.EMAIL);
  return currentUser && currentUser.length > 0;
};

const setTokenToStorage = (token) => {
  setDataToStorage(TOKEN_KEY, token);
};

const getTokenFromStorage = () => {
  return getDataFromLocalStorage(TOKEN_KEY);
};

const setCurrentUserToStorage = (data) => {
  setDataToStorage(CURRENT_USER_KEY, JSON.stringify(data));
};

const getCurrentUserFromStorage = () => {
  let user;
  try {
    user = JSON.parse(getDataFromLocalStorage(CURRENT_USER_KEY));
  } catch (error) {
  }

  return user;
};

const getOU = () => localStorage.getItem("ou") ?? '';

const removeCurrentUserFromStorage = () => {
  removeFromLocalStorage([CURRENT_USER_KEY, TOKEN_KEY]);
};

const decodeToken = (token) => {
  try {
    const tokenSplitted = token ? token.split(' ') : null;
    if (tokenSplitted && tokenSplitted.length === 2) {
      return jwtDecode(tokenSplitted[1]);
    }
  } catch (err) {
    return null;
  }
  return null;
};

const clearStorage = () => localStorage.clear();

const dateFormat = (date, format = "dd MMMM yyyy h:m") => {
  return dateFns(new Date(date), format, { locale: id });
};

const errHandler = (err) => {
  if (err.response) {
    switch (err.response.status) {
      case 500:
        console.log(err);
        break;
      case 400:
        console.log(err);
        break;
      case 300:
        console.log(err);
        break;
      case 200:
        console.log(err);
        break;
      case 401:
        console.log(err);
        window.localStorage.clear();
        window.location = "/login";
        break;
      case 403:
        console.log(err);
        break;
      default:
        console.log(err);
        break;
    }
  }
};

const errValidation = (err) => {
  if (err && err.data && err.data.hasOwnProperty("validationError")) {
    return err.data.validationError;
  }

  return null;
};

const currencyFormat = (num) => {
  try {
    return Number(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  } catch (error) {
  }

  return `${num}`;
};

const getBase64 = (file, result) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    result(reader.result)
  };
  reader.onerror = function (error) {
    result(null)
  };
}

const readArrayBuffer = (file, result) => {
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = function () {
    result(reader.result)
  };
  reader.onerror = function (error) {
    result(null)
  };
}

const addZeroPad = (num, totalLength) => {
  return `${num}`.padStart(totalLength, '0')
}

const useQueryParams = (key) => {
  const { search } = useLocation();
  let searchparams = search.replace("?", "").split("&")
  let searchparamsValue = {}
  searchparams.forEach((i) => {
    let item = i.split("=")
    return searchparamsValue[item[0]] = item[1]
  })
  return searchparamsValue[key]
}

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

const getAge = (date) => {
  const dob = new Date(date)
  const current = new Date()
  return (dob.getFullYear() - current.getFullYear()).toString().replace("-", "")
}


function getInitial(name) {
  let names = `${name}`.split(" ");
  console.log(names);
  if (names.length > 1) {
    return `${names[0].charAt(0)}${names[1].charAt(0)}`;
  } else {
    return `${names[0].charAt(0)}${names[0].charAt(names[0].length - 1)}`;
  }
}


export {
  addZeroPad,
  dateFormat,
  errHandler,
  decodeToken,
  clearStorage,
  errValidation,
  currencyFormat,
  isAuthenticated,
  setDataToStorage,
  setTokenToStorage,
  getTokenFromStorage,
  removeFromLocalStorage,
  getDataFromLocalStorage,
  setCurrentUserToStorage,
  getCurrentUserFromStorage,
  removeCurrentUserFromStorage,
  getBase64,
  readArrayBuffer,
  useQueryParams,
  s4,
  getOU,
  getAge,
  getInitial
};

