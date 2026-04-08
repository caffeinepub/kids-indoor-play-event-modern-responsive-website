import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import About from "./components/About";
import BirthdayPackages from "./components/BirthdayPackages";
import Contact from "./components/Contact";
import DailyAdmission from "./components/DailyAdmission";
import FloatingWaiverButton from "./components/FloatingWaiverButton";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import GroupDiscounts from "./components/GroupDiscounts";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MonthlyPasses from "./components/MonthlyPasses";
import PlayAreas from "./components/PlayAreas";
import PrivateEvents from "./components/PrivateEvents";
import Requirements from "./components/Requirements";
import SafetyNotice from "./components/SafetyNotice";
import WaiverCheck from "./components/WaiverCheck";
import { LanguageProvider } from "./contexts/LanguageContext";
import AdminPlaceholder from "./pages/AdminPlaceholder";
import EmployeeCheckIn from "./pages/EmployeeCheckIn";
import EmployeeWaiverCheck from "./pages/EmployeeWaiverCheck";
import WaiverPage from "./pages/WaiverPage";

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
  path: "/",
  component: MainPage,
});

const waiverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/waiver",
  component: WaiverPage,
});

const waiverCheckRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/waiver-check",
  component: WaiverCheck,
});

const employeeWaiverCheckRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employee-waiver-check",
  component: EmployeeWaiverCheck,
});

const employeeCheckInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employee-check-in",
  component: EmployeeCheckIn,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPlaceholder,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  waiverRoute,
  waiverCheckRoute,
  employeeWaiverCheckRoute,
  employeeCheckInRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
