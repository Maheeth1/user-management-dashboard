// frontend/src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';

function App() {
    return (
        <Router>
            <div className="container mx-auto p-4 max-w-4xl">
                <h1 className="text-2xl font-bold mb-4">User Management Dashboard</h1>
                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="/add-user" element={<UserForm />} />
                    <Route path="/edit-user/:id" element={<UserForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;