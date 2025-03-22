import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail'
import Form from './pages/Form'
import Edit from './pages/Edit'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:type/:id" element={<Detail />} />
        <Route path="/add/:type" element={<Form />} />
        <Route path="/edit/:type/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
};

export default App;