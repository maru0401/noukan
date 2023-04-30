import ReactDOM from 'react-dom/client';
import WorkHeader from './component/work/work_header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeHeader from './component/home/home_header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/work" element={
        <WorkHeader />
      } />
      <Route path="/*" element={
        <HomeHeader />
      } />
    </Routes>
  </BrowserRouter>
);
