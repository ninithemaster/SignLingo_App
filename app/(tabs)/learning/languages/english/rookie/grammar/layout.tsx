import { View, StyleSheet, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function GrammarLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});