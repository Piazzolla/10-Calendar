import { Navigate, Route, RouterProvider, Routes } from "react-router-dom"
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

//const authStatus = 'not-authenticated';
const authStatus = 'not-authenticated';

export const AppRouter = () => {
  return (
    <Routes>
      {
        (authStatus === 'not-authenticated') ?
          <Route path="/auth/*" element={<LoginPage />} />
          : <Route path="/*" element={<CalendarPage />} />

      }

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
