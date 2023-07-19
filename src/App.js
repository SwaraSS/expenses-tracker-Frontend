import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/users/login';
import Register from './pages/users/Register';
import AddExpense from './pages/expense/AddExpense';
import AddIncome from './pages/income/AddIncome';
import Navbar from './components/Navigation/Navbar';
import PrivateProtectRoute from './components/Navigation/PrivateProtectRoute';
import NotAdmin from './components/NotAdmin';
import Dashboard from './pages/Dashboard';
import AdminRoute from './components/Navigation/AdminRoute';
import ExpensesList from './pages/expense/ExpensesList';
import EditContent from './components/EditContent';
import EditExpense from './pages/expense/EditExpense';
import IncomeList from './pages/income/incomeList';
import Profile from './pages/users/Profile/Profile';
import UserProfileExpList from './pages/users/Profile/UserProfileExpList';
import UserProfileIncList from './pages/users/Profile/UserProfileIncList';
import UpdateProfile from './pages/users/Profile/UpdateProfile';


function App() {
  return (
    <BrowserRouter>
    <Navbar />
     <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/expenses" element={<PrivateProtectRoute component={ExpensesList } />} />
     <Route path="/incomes" element={<PrivateProtectRoute component={IncomeList } />} />
      <Route path="/edit-content" element={<PrivateProtectRoute component={EditContent } />} />
      <Route path="/edit-expense" element={<PrivateProtectRoute component={EditExpense }/> }/> 
     {/* <Route path="/dashboard" element={<AdminRoute component={Dashboard }/> }/>  */}
     <Route path="/dashboard" element={<PrivateProtectRoute component={Dashboard }/> }/> 
     <Route path="/not-found" element={<NotAdmin />} />
      <Route path="/add-income" element={<PrivateProtectRoute component={AddIncome } />} />
      <Route path="/add-expense" element={<PrivateProtectRoute component={AddExpense } />} />
      <Route path="/profile" element={<PrivateProtectRoute component={Profile } />} />
      <Route path="/user-expenses" element={<PrivateProtectRoute component={UserProfileExpList } />} />
      <Route path="/user-income" element={<PrivateProtectRoute component={UserProfileIncList } />} />
      <Route path="/update-profile" element={<PrivateProtectRoute component={UpdateProfile } />} />
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
