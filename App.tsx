import React, { useState } from 'react';
import * as reactNative from 'react-native';

export const App = () => {
  const [showPass, setShowPass] = useState(true);
  let color = 'green';

  return (
    <reactNative.SafeAreaView style={styles.container}>
      <reactNative.KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
        keyboardVerticalOffset={-150}>
        <reactNative.ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.wrap}>
          <reactNative.TextInput style={styles.input} placeholder="email" />
          <reactNative.View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <reactNative.TextInput
              style={{...styles.input, flex: 1}}
              placeholder="password"
              secureTextEntry={showPass}
            />
            <reactNative.Pressable
              style={{
                borderRadius: 100,
                backgroundColor: color,
                width: 24,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPressIn={() => {
                setShowPass(false);
              }} 
              onPressOut={() => {
                setShowPass(true);
              }}  
            >
              <reactNative.View style={{width: 12, height: 12, backgroundColor: 'white'}} />
            </reactNative.Pressable>
          </reactNative.View>
          <reactNative.Button title="Login" onPress={() => console.log('Login pressed')} />
        </reactNative.ScrollView>
      </reactNative.KeyboardAvoidingView>
    </reactNative.SafeAreaView>
  );
};

const styles = reactNative.StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    padding: 20,
    flexGrow: 1,
    gap: 10,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 60,
    borderRadius: 20,
    padding: 16,
    fontSize: 24,
  },
});

export default App;