import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type StatCardProps = {
  label: string;
  value: number;
  icon: IconName;
  background: string;
};

export function StatCard({ label, value, icon, background }: StatCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: background }]}>
      <View style={styles.labelRow}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="#FFFFFF" />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 72,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
