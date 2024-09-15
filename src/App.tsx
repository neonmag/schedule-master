import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HeaderLayout from './layouts/HeaderLayout';
import MainLayout from './layouts/MainLayout';
import About from './components/About/About';
import Schedule from './components/Schedule/Schedule';

function App() {
    return (
        <BrowserRouter>
            <HeaderLayout />
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index={true} element={<Schedule />} />
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
