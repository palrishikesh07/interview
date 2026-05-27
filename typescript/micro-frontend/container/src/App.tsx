import { BrowserRouter as Router, Route, Routes, Link  } from  "react-router-dom"
// import Courses from 'Courses/Courses';
// import HomePage from 'homePage/HomePage';
import Courses from "coursesPage/Courses";



function App() {
  return (
    <Router>
      <div>
        <nav className='navbar'>
          <ul>
            <li>
              {/* <Link to="/">HOME</Link> */}
            </li>
            <li>
              <Link to="/courses">COURSES</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
