import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  BackHandler,
  Alert,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';

const WEB_URL = 'https://anjuman-sharie-shian.vercel.app'; // Production Vercel URL

export const WebViewScreen: React.FC = () => {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [key, setKey] = useState(0);

  // Monitor network connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // Request permissions required for native features
  const requestCameraAndMicrophonePermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        console.log('Permissions granted:', granted);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestCameraAndMicrophonePermissions();
  }, []);

  // Handle hardware Back button on Android
  useEffect(() => {
    const handleBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      } else {
        Alert.alert(
          'Exit Application',
          'Are you sure you want to exit Anjuman Shari e Shian?',
          [
            { text: 'Cancel', style: 'cancel', onPress: () => {} },
            { text: 'Exit', style: 'destructive', onPress: () => BackHandler.exitApp() },
          ]
        );
        return true;
      }
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [canGoBack]);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setIsLoading(navState.loading);
  };

  const handleReload = () => {
    setKey(prev => prev + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      {isConnected ? (
        <View style={styles.webWrapper}>
          <WebView
            key={key}
            ref={webViewRef}
            source={{ uri: WEB_URL }}
            style={styles.webview}
            onNavigationStateChange={handleNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={false}
            setBuiltInZoomControls={false}
            showsHorizontalScrollIndicator={false}
            allowsBackForwardNavigationGestures={true}
            originWhitelist={['https://*', 'http://*']}
            onShouldStartLoadWithRequest={(request) => {
              // Open external links in default browser
              if (!request.url.startsWith(WEB_URL) && !request.url.startsWith('file://')) {
                Linking.openURL(request.url);
                return false;
              }
              return true;
            }}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#10b981" />
                <Text style={styles.loadingText}>Loading Anjuman Shari e Shian...</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={styles.offlineContainer}>
          <View style={styles.offlineIconContainer}>
            <Text style={styles.offlineIcon}>📶</Text>
          </View>
          <Text style={styles.offlineTitle}>No Internet Connection</Text>
          <Text style={styles.offlineDescription}>
            Please check your network settings and try again.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleReload}>
            <Text style={styles.retryButtonText}>Retry Connection</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  webWrapper: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: 15,
    fontSize: 14,
    fontWeight: '600',
  },
  offlineContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  offlineIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  offlineIcon: {
    fontSize: 48,
  },
  offlineTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  offlineDescription: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
  },
  retryButtonText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
