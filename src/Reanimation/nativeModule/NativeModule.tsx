import {
  Alert,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const NativeModule = () => {
  const { LoginModule, CalendarModule } = NativeModules;

  // for ios
  //create two screen(Login,Signup) ,
  // 1 Module file(Login Module)(objective c  .m file) and
  // 1 for Bridge(NativeScreenManager)

  // for Android
  //create LoginActivity.java and SignupActivity
  //create Layoutfolder and then screen design  activity_login.xml,activity_signup.xml,
  // add file for navigation in AndroidMainifest.xml
  // create activity like this    <activity android:name=".LoginActivity"/>
  // create MyNativeModules.java
  //LoginPackage.java
  // Register in MainAplication.kt  like this   add(LoginPackage())

  return (
    <LinearGradient
      colors={['#2575fc', '#6a11cb']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Android & Ios Native Module</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            if (Platform.OS === 'android') {
              LoginModule.showLoginScreen();
            } else {
              LoginModule.openLoginScreen();
            }
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { marginTop: 20, backgroundColor: '#fff', borderColor: '#6a11cb' },
          ]}
          activeOpacity={0.8}
          onPress={() => {
            if (Platform.OS === 'android') {
              LoginModule.showSignupScreen();
            } else {
              LoginModule.openSignupScreen();
            }
          }}>
          <Text style={[styles.buttonText, { color: '#6a11cb' }]}>Signup</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default NativeModule;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  button: {
    width: 220,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#2575fc',
    marginBottom: 10,
  },
  buttonText: {
    color: '#2575fc',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
