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


// import React from 'react';

// import MainNavigator from './src/navigations/MainNavigator';

// const App = () => {
//   return <MainNavigator />;
// };

// export default App;