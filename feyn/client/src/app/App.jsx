import AppRoutes from "../routes/AppRoutes";
import { AuthProvider } from "../context/AuthContext";
import TrendingProducts from "../components/TrendingProducts";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;