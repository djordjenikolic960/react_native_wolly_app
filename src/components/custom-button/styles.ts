import { StyleSheet } from "react-native";
import { ThemeType } from "../../theme";

export const createStyles = (theme: ThemeType ) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xxl,
        alignItems: 'center',
        borderRadius: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        alignSelf: 'flex-start',
    },
    label: {
        fontSize: theme.fonts.sizes.medium,
        color: '#FFF',
        fontWeight: 'bold',
    }
  });