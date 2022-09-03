import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import NavBar from './components/layout/NavBar';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';
function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass="min-height">
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/company' element={<Company/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/newproject' element={<NewProject/>}/>      
            <Route path='/projects' element={<Projects/>}/>      
            <Route path='/project/:id' element={<Project/>}/>      
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
