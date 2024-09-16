import { Outlet } from 'react-router';
import Degree from '../components/Degree/Degree';

const MainLayout = () => {
    return (
        <>
            <Degree />
            <Outlet />
        </>
    );
};

export default MainLayout;
