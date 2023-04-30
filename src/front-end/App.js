import AuthProvider from "./src/provider/AuthProvider";
import Routes from "./src/routes";
const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
