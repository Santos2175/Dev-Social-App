import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import PrivateRoute from './components/routing/PrivateRoute';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

//redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import './App.css';

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />

        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profiles' element={<Profiles />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route
            path='/dashboard'
            element={<PrivateRoute component={Dashboard} />} //stay in dashboard if authenticated
          />
          <Route
            path='/create-profile'
            element={<PrivateRoute component={ProfileForm} />} //stay in dashboard if authenticated
          />
          <Route
            path='/edit-profile'
            element={<PrivateRoute component={ProfileForm} />} //stay in dashboard if authenticated
          />
          <Route
            path='/add-experience'
            element={<PrivateRoute component={AddExperience} />} //stay in dashboard if authenticated
          />
          <Route
            path='/add-education'
            element={<PrivateRoute component={AddEducation} />} //stay in dashboard if authenticated
          />
          <Route path='/posts' element={<PrivateRoute component={Posts} />} />
          <Route
            path='/posts/:id'
            element={<PrivateRoute component={Post} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
