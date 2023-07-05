import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter your email.');
    } else {
      Alert.alert('Password Reset', `Instructions to reset your password have been sent to ${email}`);
      setEmail('');
      setOldPassword('');
      setNewPassword('');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Reset Password</Text>
      <TextInput
        style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Enter your email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Enter old password"
        secureTextEntry
        value={oldPassword}
        onChangeText={text => setOldPassword(text)}
      />
      <TextInput
        style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Enter new password"
        secureTextEntry
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
      <View style={{ marginTop: 10 }}>
        <Button title="Go Back" onPress={handleGoBack} />
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
