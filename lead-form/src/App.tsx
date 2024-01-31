import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LeadGenerator from './pages/LeadGenerator';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeadGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;