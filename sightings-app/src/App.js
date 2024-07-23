import { Route, Routes } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import SiteNav from './components/common/SiteNav';
import SiteFooter from './components/common/SiteFooter';
import HomePage from './components/home/HomePage';
import SightingPage from './components/Sightings/SightingPage';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { signOut } from "aws-amplify/auth"
import { generateClient } from 'aws-amplify/api';
import config from './amplifyconfiguration';
import awsmobile from './aws-exports';
import { StorageImage, StorageManager } from '@aws-amplify/ui-react-storage';




const App = ({ signOut, user }) => {
  


  return (
      <div>
        <SiteNav logOut={signOut}/>
        <Routes>
          <Route path='*' element={<HomePage/>} />
          <Route path='/allsightings' element={<SightingPage/>} />
        </Routes>

        <StorageManager path="public/" maxFileCount={3} /> 
        <SiteFooter />
      </div>
  );
}

export default withAuthenticator(App);