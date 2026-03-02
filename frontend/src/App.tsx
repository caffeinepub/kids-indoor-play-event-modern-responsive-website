import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InternetIdentityProvider } from './hooks/useInternetIdentity';
import { LanguageProvider } from './contexts/LanguageContext';
import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import PlayAreas from './components/PlayAreas';
import SafetyNotice from './components/SafetyNotice';
import DailyAdmission from './components/DailyAdmission';
import GroupDiscounts from './components/GroupDiscounts';
import BirthdayPackages from './components/BirthdayPackages';
import PrivateEvents from './components/PrivateEvents';
import MonthlyPasses from './components/MonthlyPasses';
import Requirements from './components/Requirements';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPlaceholder from './pages/AdminPlaceholder';
import WaiverPage from './pages/WaiverPage';
import WaiverCheck from './components/WaiverCheck';
import EmployeeWaiverCheck from './pages/EmployeeWaiverCheck';
import EmployeeCheckIn from './pages/EmployeeCheckIn';
import FloatingWaiverButton from './components/FloatingWaiverButton';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

// Root layout component
function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

// Main page component
function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <PlayAreas />
        <SafetyNotice />
        <DailyAdmission />
        <GroupDiscounts />
        <BirthdayPackages />
        <PrivateEvents />
        <MonthlyPasses />
        <Requirements />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FloatingWaiverButton />
    </div>
  );
}

// Create routes
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: MainPage,
});

const waiverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/waiver',
  component: WaiverPage,
});

const waiverCheckRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/waiver-check',
  component: WaiverCheck,
});

const employeeWaiverCheckRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/employee-waiver-check',
  component: EmployeeWaiverCheck,
});

const employeeCheckInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/employee-check-in',
  component: EmployeeCheckIn,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPlaceholder,
});

const routeTree = rootRoute.addChildren([
  indexRoute, 
  waiverRoute, 
  waiverCheckRoute, 
  employeeWaiverCheckRoute, 
  employeeCheckInRoute,
  adminRoute
]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}
