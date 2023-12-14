
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, loading=false }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {!loading && <Text style={styles.buttonText}>{title}</Text>}
      {loading && <ActivityIndicator color="white" size={"large"}/>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#d33333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});

export default Button;
