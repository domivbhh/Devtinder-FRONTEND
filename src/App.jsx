import React from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import store from './store/store';
import Feed from './components/Feed';
import Requests from './components/Requests';
import Connections from './components/Connections';

const App = () => {
  return (
    <div>
      <Provider store={store}>

      <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body/>}>
            <Route index={true} element={<Feed/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/connections' element={<Connections/>}/>
            <Route path='/requests' element={<Requests/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Route>

      </Routes>     
      </BrowserRouter>

      </Provider>

    </div>
  );
}

export default App
