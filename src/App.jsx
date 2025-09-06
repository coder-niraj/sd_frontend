import 'es5-polyfill';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Protected from './secure/Protected';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { RecoilRoot, useRecoilValue } from "recoil"
import Profile from './components/Profile';
import PublicProfile from './components/PublicProfile';
import Personal from './pages/personalChat/Personal';
import Group from './pages/Group/Group';
import GroupRegister from './pages/Group/GroupRegister';
import GroupInfo from './pages/Group/components/GroupInfo';
import EditGroup from './pages/Edit/Group';
import EditProfile from './pages/Edit/Profile';

function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <Protected>
                <Register />
              </Protected>
            } />
            <Route path='/login' element={
              <Protected>
                <Login />
              </Protected>
            } />

            <Route path='/home/group' element={
              <Protected>
                <Home>
                  <Group />
                </Home>
              </Protected>
            } />
            <Route path='/group-profile' element={
              <Protected>
                <Home>
                  <GroupInfo />
                </Home>
              </Protected>
            } />
            <Route path='/home' element={
              <Protected>
                <Home>
                  <Personal />
                </Home>
              </Protected>
            } />
            <Route path='/edit/group' element={
              <Protected>
                <Home>
                  <EditGroup />
                </Home>
              </Protected>
            } />
            <Route path='/edit/profile' element={
              <Protected>
                <Home>
                  <EditProfile />
                </Home>
              </Protected>
            } />

            <Route path='/profile' element={
              <Protected>
                <Profile />
              </Protected>
            } />
            <Route path='/public-profile' element={
              <Protected>
                <PublicProfile />
              </Protected>
            } />
            <Route path='/create-group' element={
              <Protected>
                <GroupRegister />
              </Protected>
            } />

          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        // transition:Bounce,
        />

      </RecoilRoot>
    </>
  );
}

export default App;
