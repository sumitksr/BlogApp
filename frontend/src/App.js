import Home from './pages/Home';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import EditPost from './pages/editPost';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import RequireAuth from './components/RequireAuth';
import "./index.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/create" element={
          <RequireAuth>
            <CreatePost />
          </RequireAuth>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit" element={
          <RequireAuth>
            <EditPost />
          </RequireAuth>
        } />
        <Route path ="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;