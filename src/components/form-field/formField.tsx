import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {BaseError} from '../../errors/BaseError';
import {getErrorMessage} from '../../utils/errorUtils';

interface FormFieldProps extends TextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error: BaseError | null;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        {...rest}
      />
      {error != null ? (
        <Text
          style={{
            marginTop: 12,
            color: '#ff0000',
          }}>
          {getErrorMessage(error)}
        </Text>
      ) : null}
    </View>
  );
};

export default FormField;
