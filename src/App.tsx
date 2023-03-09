import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import PaymentForm from "./components/PaymentForm";
const Spinner = lazy(() => import("./components/Spinner"));
const NotFound = lazy(() => import("./components/NotFound"));
const PaymentForm = lazy(() => import("./components/PaymentForm"));
const ConfirmForm = lazy(() => import("./components/ConfirmationPage"));
const queryClient = new QueryClient({});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner />}>
        <Toaster position={"top-right"} />
        <Router>
          <Routes>
            <Route path="/" element={<PaymentForm />} />
            <Route path="/confirm/trxref/:trxref" element={<ConfirmForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
