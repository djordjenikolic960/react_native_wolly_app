import {Alert} from 'react-native';
interface AlertProps {
  title: string;
  subtitle: string;
  positiveButtonText: string;
  negativeButtonText: string;
  onPositiveButtonPressed: () => void;
  onNegativeButtonPressed: () => void;
}

const createAlertDialog = ({
  title,
  subtitle,
  positiveButtonText,
  negativeButtonText,
  onPositiveButtonPressed = () => {},
  onNegativeButtonPressed = () => {},
}: AlertProps): void => {
  Alert.alert(title, subtitle, [
    {
      text: negativeButtonText,
      onPress: onNegativeButtonPressed,
    },
    {text: positiveButtonText, onPress: onPositiveButtonPressed},
  ]);
};

export default createAlertDialog;
