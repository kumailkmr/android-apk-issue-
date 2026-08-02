import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WebViewScreen } from './src/components/WebViewScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <WebViewScreen />
    </SafeAreaProvider>
  );
}

export default App;
