import UserDashboard from '../components/Dashboard/UserDashboard';
import LendingDashboard from '../components/Lending/LendingDashboard';
import AnalyticsDashboard from '../components/Analytics/AnalyticsDashboard';
import AdminPanel from '../components/Admin/AdminPanel';
import UserProfile from '../components/Dashboard/UserProfile';

export const routes = [
  {
    path: '/',
    component: UserDashboard,
    name: 'Dashboard',
    icon: 'dashboard',
    isPublic: false
  },
  {
    path: '/lending',
    component: LendingDashboard,
    name: 'Lending',
    icon: 'account_balance',
    isPublic: false
  },
  {
    path: '/analytics',
    component: AnalyticsDashboard,
    name: 'Analytics',
    icon: 'analytics',
    isPublic: false
  },
  {
    path: '/profile',
    component: UserProfile,
    name: 'Profile',
    icon: 'person',
    isPublic: false
  },
  {
    path: '/admin',
    component: AdminPanel,
    name: 'Admin',
    icon: 'admin_panel_settings',
    isAdmin: true,
    isPublic: false
  }
]; 