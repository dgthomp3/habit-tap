// styles.js
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#6ABF69',       // soft green
  secondary: '#A3D9A5',     // light mint
  background: '#FFFFFF',
  text: '#333333',
  muted: '#888888',
  red: '#EF5350',           // red for missed days / Pomodoro
  yellow: '#FFEB3B',        // yellow indicator for completed days
  card: '#F3F9F3',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: colors.muted,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  iconButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 50,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 10,
    backgroundColor: colors.card,
    marginBottom: 6,
  },
});
