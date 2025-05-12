import React, {useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import validationMessages from '../constants/validationMessages';

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    age: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
  });

  const handleInputChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        const selectedAsset = response.assets[0];
        const uri = selectedAsset.uri || '';
        if (uri.toLowerCase().endsWith('.png')) {
          setForm({...form, profileImage: uri});
        } else {
          Alert.alert('Validation Error', validationMessages.invalidImage);
        }
      }
    });
  };

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = password =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password);
  const validatePhoneNumber = phone => /^\d{10}$/.test(phone);

  const handleSubmit = () => {
    const {
      firstName,
      lastName,
      email,
      address,
      age,
      phone,
      password,
      confirmPassword,
      profileImage,
    } = form;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !age ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Validation Error', validationMessages.allFieldsRequired);

      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation Error', validationMessages.invalidEmail);
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Validation Error', validationMessages.weakPassword);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', validationMessages.passwordMismatch);
      return;
    }

    if (!validatePhoneNumber(phone)) {
      Alert.alert('Validation Error', validationMessages.invalidPhone);
      return;
    }

    if (!profileImage || !profileImage.toLowerCase().endsWith('.png')) {
      Alert.alert('Validation Error', validationMessages.invalidImage);
      return;
    }

    Alert.alert('Success', validationMessages.success);
    console.log('Form Data:', form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="First Name"
        value={form.firstName}
        onChangeText={text => handleInputChange('firstName', text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Last Name"
        value={form.lastName}
        onChangeText={text => handleInputChange('lastName', text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={text => handleInputChange('email', text)}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Address"
        value={form.address}
        onChangeText={text => handleInputChange('address', text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Age"
        value={form.age}
        onChangeText={text => handleInputChange('age', text)}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Phone Number"
        value={form.phone}
        onChangeText={text => handleInputChange('phone', text)}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {form.profileImage ? (
          <Image source={{uri: form.profileImage}} style={styles.image} />
        ) : (
          <Text>Select Profile Image (PNG only)</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Password"
        value={form.password}
        onChangeText={text => handleInputChange('password', text)}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChangeText={text => handleInputChange('confirmPassword', text)}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        testID="signUpButton">
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#333',
    borderWidth: 1,
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#6c63ff',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
