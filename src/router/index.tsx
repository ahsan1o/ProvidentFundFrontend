import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { LoginPage } from '../modules/auth/LoginPage';
import { DashboardPage } from '../modules/dashboard/DashboardPage';
import { PfAccountsPage } from '../modules/pf-accounts/PfAccountsPage';
import { ContributionsPage } from '../modules/contributions/ContributionsPage';
import { WithdrawalsPage } from '../modules/withdrawals/WithdrawalsPage';
import { LoansPage } from '../modules/loans/LoansPage';
import { SettlementsPage } from '../modules/settlements/SettlementsPage';
import { ReportsPage } from '../modules/reports/ReportsPage';
import { SettingsPage } from '../modules/admin/SettingsPage';
import { PortalHomePage } from '../modules/portal/PortalHomePage';
import { TransactionsPage } from '../modules/transactions/TransactionsPage';
import { PortalRequestsPage } from '../modules/portal/PortalRequestsPage';
import { PrivateRoute } from './PrivateRoute';

export function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pf-accounts" element={<PfAccountsPage />} />
          <Route path="/contributions" element={<ContributionsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/withdrawals" element={<WithdrawalsPage />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/settlements" element={<SettlementsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/portal" element={<PortalHomePage />} />
          <Route path="/portal/requests" element={<PortalRequestsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
