import React from 'react';
import Index from "./pages/home";
import {QueryClient, QueryClientProvider} from "react-query";
import {StoreProvider, useStoreRehydrated} from "easy-peasy";
import store from "./store/store";
import {ReactQueryDevtools} from "react-query/devtools";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import router from "./routes";
import Login_Page from "./pages/login";
import {theme} from "./theme/theme";


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
                           <RouterProvider router={router}/>
                       <ReactQueryDevtools initialIsOpen={false}/>
                   </QueryClientProvider>
               </WaitForStateRehydration>
           </StoreProvider>
        </ThemeProvider>





            

    );
};

export default App;