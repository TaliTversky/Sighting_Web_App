import { Route, Routes } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import SiteNav from './components/common/SiteNav';
import SiteFooter from './components/common/SiteFooter';
import HomePage from './components/home/HomePage';
import SightingPage from './components/Sightings/SightingPage';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { signOut } from "aws-amplify/auth"
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from 'aws-amplify/api';
import config from './amplifyconfiguration.json';
import awsExports from './aws-exports';
import { StorageImage, StorageManager } from '@aws-amplify/ui-react-storage';

Amplify.configure(awsExports);

function App() {
  


  return (
    <Authenticator loginMechanism={['email']}>
      {({ signOut, user }) => (
      <div>
        <SiteNav logOut={signOut}/>
        <Routes>
          <Route path='*' element={<HomePage/>} />
          <Route path='/allsightings' element={<SightingPage/>} />
        </Routes>

        <StorageManager path="public/" maxFileCount={3} /> 
        <SiteFooter />
      </div>
      )}
    </Authenticator>
  );
}

export default App;