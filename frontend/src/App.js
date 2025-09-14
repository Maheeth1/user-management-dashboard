// frontend/src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-200">
                <Navbar />
                <main className="flex justify-center p-4">
                    <div className="w-full max-w-4xl  bg-gray-200 p-6 rounded-lg shadow-lg">
                        <Routes>
                            <Route path="/" element={<UserList />} />
                            <Route path="/add-user" element={<UserForm />} />
                            <Route path="/edit-user/:id" element={<UserForm />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    );
}

export default App;