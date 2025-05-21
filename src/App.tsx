import { RouterProvider } from "react-router";
import router from "./router/routes";
import ThemeProvider from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";


export default function App() {
  return (

    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
      />
    </ThemeProvider >
  )
}
