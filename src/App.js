import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Performance from './components/Performance';
import AddRecord from './components/AddRecord';
import RecoverCredentials from './pages/RecoverCredentials';
import Record from './components/Record';
import RecordDetails from './components/RecordDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="performance" element={<Performance/>}/>
          <Route path="add-record" element={<AddRecord/>}/>
          <Route path="records" element={<Record />} />
          <Route path="record-details" element={<RecordDetails />} />
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/recover-credentials" element={<RecoverCredentials />} />
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
