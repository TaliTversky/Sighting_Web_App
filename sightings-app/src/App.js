import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import SiteFooter from './components/common/SiteFooter';
import SiteNav from './components/common/SiteNav';
import HomePage from './components/home/HomePage';

function App() {
  return (
    <div>

      <SiteNav/>
      <HomePage/>
      <SiteFooter/>
    </div>
  );
}

export default App;
