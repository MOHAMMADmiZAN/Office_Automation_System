import React from 'react';
import Index from "./pages";
import {QueryClient, QueryClientProvider} from "react-query";
import {StoreProvider, useStoreRehydrated} from "easy-peasy";
import store from "./store/store";
import {ReactQueryDevtools} from "react-query/devtools";
import {CssBaseline} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import router from "./routes";


interface APP_PROPS {

}
const queryClient = new QueryClient()

function WaitForStateRehydration({ children }: { children: React.ReactElement }): React.ReactElement | null {
    const isRehydrated = useStoreRehydrated()
    return isRehydrated ? children : null
}



const App: React.FC<APP_PROPS> = (props) : JSX.Element => {
    return (
           <StoreProvider store={store}>
               <WaitForStateRehydration>
                   <QueryClientProvider client={queryClient}>
                       <CssBaseline/>
                       <RouterProvider router={router} />
                       <ReactQueryDevtools initialIsOpen={false}/>
                   </QueryClientProvider>
               </WaitForStateRehydration>
           </StoreProvider>




            

    );
};

export default App;