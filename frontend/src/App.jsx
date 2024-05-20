import React, { createContext, useEffect, useState } from 'react'
import WordScramble from './components/WordScramble'
import {Toaster} from 'react-hot-toast'
import TicTacToe from './components/TicTacToe'
import { Routes, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Sign from './pages/Sign'
import Login from './pages/Login'
import axios from "axios";
import Home from './pages/Home'
import { useTranslation } from 'react-i18next';


export const userContext = createContext();

const App = () => {

  const { i18n } = useTranslation();
  const [beeWords, setBeeWords] = useState([]);


  useEffect(() => {
    const fetchTranslations = async (lang) => {
      try {
        const response = await axios.get(`http://localhost:4000/locales/${lang}/translation.json`);
        setBeeWords(response.data);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    fetchTranslations(i18n.language); // İlk sayfa yüklendiğinde varsayılan dili yükler

    const changeLanguageListener = (lang) => {
      fetchTranslations(lang);
    };

    i18n.on('languageChanged', changeLanguageListener);

    return () => {
      i18n.off('languageChanged', changeLanguageListener);
    };
  }, [i18n]);


  const [user, setUser] = useState({});

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:4000/auth/verify")
    .then(res => {
      console.log(res.data)
      setUser(res.data)
    })
    .catch(err => console.log(err));
  }, []);


  return (
    <userContext.Provider value={{user, beeWords}}>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signin' element={<Sign />}/>
        <Route path='/' element={user.fullName ? <Home /> : <Login />}/>
        <Route path='/tictac' element={user.fullName ? <TicTacToe /> : <Login />}/>
        <Route path='/wordgame' element={user.fullName ? <WordScramble /> : <Login />}/>
      </Routes>
      <Toaster /> 
    </userContext.Provider>
  )
}

export default App