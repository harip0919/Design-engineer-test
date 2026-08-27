import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { StatCard } from './src/components/StatCard';
import { colors, spacing } from './src/theme/tokens';

const stats = [
  { label: 'Total', value: 0, icon: 'list-outline' as const, background: colors.stats[0] },
  { label: 'Unattempted', value: 0, icon: 'remove-outline' as const, background: colors.stats[1] },
  { label: 'Incomplete', value: 0, icon: 'close-outline' as const, background: colors.stats[2] },
  { label: 'Completed', value: 0, icon: 'checkmark-outline' as const, background: colors.stats[3] },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.statusRow}>
          <Text style={styles.statusTime}>05:24 pm</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="cellular" size={16} color={colors.text} />
            <Ionicons name="wifi" size={16} color={colors.text} />
            <Ionicons name="battery-full" size={18} color={colors.text} />
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.time}>05:24 pm</Text>
          <Text style={styles.greetingText}>
            Good Evening, got supervisor! Let&apos;s get started!
          </Text>
        </View>

        <View style={styles.stats}>
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.screen,
  },
  statusRow: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusTime: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  header: {
    height: 56,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  greeting: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  time: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: colors.text,
  },
  greetingText: {
    marginTop: 6,
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
  stats: {
    gap: 12,
  },
});
