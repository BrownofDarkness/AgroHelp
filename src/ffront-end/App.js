import React from 'react';

import MainNavigator from './src/navigations/MainNavigator';

const App = () => {
  return <MainNavigator />;
};

export default App;

// import AuthProvider from "./src/provider/AuthProvider";
// import Routes from "./src/routes";
// const App = () => {
//   return (
//     <AuthProvider>
//       <Routes />
//     </AuthProvider>
//   );
// };

// export default App;

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
