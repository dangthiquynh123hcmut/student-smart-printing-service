import LoginForm from "./Components/LoginForm/LoginForm";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./Components/Home";
import Print from "./Components/PrintPage/Print";
import History from "./Components/HistoryPage/History";

// layouts
import RootLayout from "./Layouts/RootLayout";
import UserInfo from "./Layouts/UserInfo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginForm />} />

      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="print" element={<Print />} />
        <Route path="history" element={<History />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
