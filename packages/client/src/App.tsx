import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "./pages";
import {QueryClient, QueryClientProvider} from "react-query";
import {StoreProvider, useStoreRehydrated} from "easy-peasy";
import store from "./store/store";
import {ReactQueryDevtools} from "react-query/devtools";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import router from "./routes";
import {theme} from "./theme/theme";

import MainLayout from './layouts/mainlayout/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard_Page';
import Email from './pages/Email/Email_Page';
import Profile from './pages/Profile/Profile_Page';


 // using react query
const queryClient = new QueryClient()



// using easy-peasy rehydration  reference https://easy-peasy.now.sh/docs/api/store.html#rehydrate
function WaitForStateRehydration({ children }: { children: React.ReactElement }): React.ReactElement | null {
    const isRehydrated = useStoreRehydrated()
    return isRehydrated ? children : null
}



const App: React.FC = () : JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <StoreProvider store={store}>
               <WaitForStateRehydration>
                   <QueryClientProvider client={queryClient}>
                       <CssBaseline/>
                           {/* <RouterProvider router={router}/> */}
                           <BrowserRouter>
                                    <Routes>

                                        <Route element={<MainLayout/>} >
                                            <Route index element={<Dashboard/>} />
                                            <Route path="/email" element={<Email/>} />
                                            <Route path="/profile" element={<Profile/>} />
                                        </Route>

                                </Routes>
                            </BrowserRouter>
                       <ReactQueryDevtools initialIsOpen={false}/>
                   </QueryClientProvider>
               </WaitForStateRehydration>
           </StoreProvider>
        </ThemeProvider>





            

    );
};

export default App;