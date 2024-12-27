import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      position: 'absolute',
    },
  });

  export default styles;