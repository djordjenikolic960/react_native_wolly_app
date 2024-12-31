import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A7DDF',
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bottomSheet: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  input: {
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    color: '#333333',
  },
  footerText: {
    textAlign: 'center',
    color: '#000',
  },
});
