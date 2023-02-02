import React from 'react';
import Index from "./pages";
import {QueryClient, QueryClientProvider} from "react-query";
import {StoreProvider, useStoreRehydrated} from "easy-peasy";
import store from "./store/store";
import {ReactQueryDevtools} from "react-query/devtools";
import {CssBaseline} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import router from "./routes";
import Login from "./pages/login";


 // using react query
const queryClient = new QueryClient()



// using easy-peasy rehydration  reference https://easy-peasy.now.sh/docs/api/store.html#rehydrate
function WaitForStateRehydration({ children }: { children: React.ReactElement }): React.ReactElement | null {
    const isRehydrated = useStoreRehydrated()
    return isRehydrated ? children : null
}



const App: React.FC = () : JSX.Element => {
    return (
           <StoreProvider store={store}>
               <WaitForStateRehydration>
                   <QueryClientProvider client={queryClient}>
                       <CssBaseline/>
                       <RouterProvider router={router}/>
                       <ReactQueryDevtools initialIsOpen={false}/>
                   </QueryClientProvider>
               </WaitForStateRehydration>
           </StoreProvider>




            

    );
};

export default App;