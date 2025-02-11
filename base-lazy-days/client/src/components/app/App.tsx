import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../../react-query/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";

import { Home } from "./Home";
import { Loading } from "./Loading";
import { Navbar } from "./Navbar";
import { ToastContainer } from "./toast";

import { AuthContextProvider } from "@/auth/AuthContext";
import { Calendar } from "@/components/appointments/Calendar";
import { AllStaff } from "@/components/staff/AllStaff";
import { Treatments } from "@/components/treatments/Treatments";
import { Signin } from "@/components/user/Signin";
import { UserProfile } from "@/components/user/UserProfile";
import { theme } from "@/theme";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthContextProvider>
          <Loading />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Staff" element={<AllStaff />} />
              <Route path="/Calendar" element={<Calendar />} />
              <Route path="/Treatments" element={<Treatments />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/user/:id" element={<UserProfile />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </AuthContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
