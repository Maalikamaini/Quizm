import React, { useState } from 'react';
import { View, useColorScheme, StyleSheet, Modal, StatusBar } from 'react-native';
import { TextInput, Button, Checkbox, Text, IconButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const Signup = ({ navigation }) => {
  const [formErrors, setFormErrors] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };

  const validateForm = () => {
    const errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!email) {
      errors.email = 'Email address is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid email address';
    }
    if (!phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    }
    if (!agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if there are no errors
  };

  const handleSignup = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      setErrorModalVisible(true);
      // navigation.navigate('Quiz');
    }
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} hidden />
      <View>
        <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 10, marginLeft: 10, color: isDarkMode ? 'white' : 'black' }}>Sign Up</Text>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            mode="outlined"
            theme={{
              colors: { primary: 'black', background: 'white' },
              roundness: 10,
              mode: isDarkMode ? 'exact' : 'adaptive',
            }}
            style={styles.textInput}
          />
          {formErrors.firstName && <Text style={styles.errorText}>{formErrors.firstName}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            mode="outlined"
            theme={{
              colors: { primary: 'black', background: 'white' },
              roundness: 10,
              mode: isDarkMode ? 'exact' : 'adaptive',
            }}
            style={styles.textInput}
          />
          {formErrors.lastName && <Text style={styles.errorText}>{formErrors.lastName}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Email Address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            theme={{
              colors: { primary: 'black', background: 'white' },
              roundness: 10,
              mode: isDarkMode ? 'exact' : 'adaptive',
            }}
            style={styles.textInput}
          />
          {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
            mode="outlined"
            keyboardType="numeric"
            theme={{
              colors: { primary: 'black', background: 'white' },
              roundness: 10,
              mode: isDarkMode ? 'exact' : 'adaptive',
            }}
            style={styles.textInput}
          />
          {formErrors.phoneNumber && <Text style={styles.errorText}>{formErrors.phoneNumber}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={hidePassword}
            mode="outlined"
            theme={{
              colors: { primary: 'black', background: 'white' },
              roundness: 10,
              mode: isDarkMode ? 'exact' : 'adaptive',
            }}
            style={styles.textInput}
          />
          {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={hideConfirmPassword}
            mode="outlined"
            theme={{
              colors: { primary: 'black', background: 'white' },
              roundness: 10,
              mode: isDarkMode ? 'exact' : 'adaptive',
            }}
            style={styles.textInput}
          />
          {formErrors.confirmPassword && <Text style={styles.errorText}>{formErrors.confirmPassword}</Text>}
        </View>

        <View style={styles.termsContainer}>
          <Checkbox
            status={agreeToTerms ? 'checked' : 'unchecked'}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
            color={agreeToTerms ? 'blue' : 'white'}
          />
          <Text style={{ color: isDarkMode ? 'white' : 'black' }}>I agree to the terms and conditions</Text>
        </View>

        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['blue', 'blue', 'white']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Button onPress={handleSignup}>
              <Text style={styles.buttonText}>Signup</Text>
            </Button>
          </LinearGradient>
        </View>
      </View>
      <Modal
        visible={errorModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Signup Successful!</Text>
            <Text style={styles.modalText}>Welcome {firstName}</Text>
            <Button onPress={() => {
              setErrorModalVisible(false);
              navigation.navigate('Quiz');
            }}>
              Go to Quiz
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    position: 'relative',
  },
  textInput: {
    paddingVertical: 8,
  },
  eyeIcon: {
    position: 'absolute',
    top: '50%',
    right: 8,
    transform: [{ translateY: -12 }],
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    borderRadius: 10,
    height: 50,
    width: 190,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 2,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Signup;

