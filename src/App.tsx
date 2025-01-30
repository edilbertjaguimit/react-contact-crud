import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Users from './pages/Users';
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route path='home' element={<Home />} />
            <Route path='users' element={<Users />} />
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
