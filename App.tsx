import React, { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

const C = {
  bg: '#F2F4F8', blue: '#2F70B5', blueDark: '#2F5C86', blueSoft: '#EAF3FB',
  text: '#1E293B', muted: '#64748B', border: '#E2E8F0', white: '#FFFFFF',
  green: '#4CB748', red: '#EF4444', amber: '#F59E0B',
};

type Screen = 'home' | 'premises' | 'appointments' | 'tasks' | 'checkin' | 'checkout' | 'execution' | 'site' | 'unavailable' | 'reason' | 'submitted';

const stats = [
  ['Total', '24', 'Total assigned'],
  ['Unattempted', '08', 'Awaiting action'],
  ['Incomplete', '06', 'In progress'],
  ['Completed', '10', 'Successfully closed'],
];

function Header({ title, onBack }: { title: string; onBack?: () => void }) {
  return <View style={styles.header}><View style={styles.headerInner}>{onBack ? <Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable> : <View style={styles.back} />}<Text style={styles.headerTitle}>{title}</Text><View style={styles.back} /></View></View>;
}

function Button({ label, onPress, secondary = false }: { label: string; onPress: () => void; secondary?: boolean }) {
  return <Pressable onPress={onPress} style={[styles.button, secondary && styles.buttonSecondary]}><Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text></Pressable>;
}

function Card({ children, style }: { children: React.ReactNode; style?: object }) { return <View style={[styles.card, style]}>{children}</View>; }

function StatCard({ label, value, hint, index }: { label: string; value: string; hint: string; index: number }) {
  return <Card style={[styles.statCard, { backgroundColor: [C.blueSoft, '#DDEBF7', '#C9DDF0', '#B5CEE5'][index] }]}><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text><Text style={styles.statHint}>{hint}</Text></Card>;
}

function Field({ label, value, placeholder, onChangeText, multiline = false }: { label: string; value?: string; placeholder?: string; onChangeText?: (v: string) => void; multiline?: boolean }) {
  return <View style={styles.field}><Text style={styles.fieldLabel}>{label}</Text><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#94A3B8" multiline={multiline} style={[styles.input, multiline && styles.textarea]} /></View>;
}

function Choice({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.choice}><View style={[styles.radio, selected && styles.radioSelected]}>{selected && <View style={styles.radioDot} />}</View><Text style={styles.choiceText}>{label}</Text></Pressable>;
}

function Home({ go }: { go: (s: Screen) => void }) {
  return <><Header title="Home" /><ScrollView contentContainerStyle={styles.content}><Text style={styles.time}>05:24 pm</Text><Text style={styles.greeting}>Good Evening, got supervisor! Let's get started!</Text><Text style={styles.sectionTitle}>Today's work</Text><View style={styles.stats}>{stats.map((s, i) => <StatCard key={s[0]} label={s[0]} value={s[1]} hint={s[2]} index={i} />)}</View><Card><Text style={styles.cardTitle}>Assigned work</Text><Text style={styles.muted}>View premises and scheduled appointments.</Text><Button label="View Work Orders" onPress={() => go('premises')} /></Card></ScrollView></>;
}

function Premises({ go }: { go: (s: Screen) => void }) { return <><Header title="Premises" onBack={() => go('home')} /><ScrollView contentContainerStyle={styles.content}><Field label="Search premises" placeholder="Search by name or ID" /><Card><Text style={styles.cardTitle}>Green Valley Apartments</Text><Text style={styles.muted}>Premises ID: PR-10482</Text><Text style={styles.row}>24, Lake View Road</Text><Button label="View Appointments" onPress={() => go('appointments')} /></Card><Card><Text style={styles.cardTitle}>Sunrise Residency</Text><Text style={styles.muted}>Premises ID: PR-10517</Text><Text style={styles.row}>18, Market Street</Text><Button label="View Appointments" onPress={() => go('appointments')} /></Card></ScrollView></>; }

function Appointments({ go }: { go: (s: Screen) => void }) { return <><Header title="Appointments" onBack={() => go('premises')} /><ScrollView contentContainerStyle={styles.content}><Text style={styles.sectionTitle}>Today's appointments</Text>{['09:30 AM  •  WO-10482', '11:00 AM  •  WO-10517', '02:30 PM  •  WO-10522'].map((x, i) => <Card key={x}><Text style={styles.badge}>{i === 0 ? 'UPCOMING' : 'SCHEDULED'}</Text><Text style={styles.cardTitle}>Gas meter inspection</Text><Text style={styles.muted}>{x}</Text><Button label="Open Work Order" onPress={() => go('tasks')} /></Card>)}</ScrollView></>; }

function Tasks({ go }: { go: (s: Screen) => void }) { return <><Header title="Work Order Tasks" onBack={() => go('appointments')} /><ScrollView contentContainerStyle={styles.content}><Card><Text style={styles.badge}>WO-10482</Text><Text style={styles.cardTitle}>Green Valley Apartments</Text><Text style={styles.muted}>Scheduled today • 09:30 AM</Text></Card>{['Verify customer details', 'Inspect meter and installation', 'Record site details'].map((x, i) => <Card key={x}><View style={styles.taskRow}><View style={styles.taskNumber}><Text style={styles.taskNumberText}>{i + 1}</Text></View><View style={{ flex: 1 }}><Text style={styles.cardTitle}>{x}</Text><Text style={styles.muted}>{i === 0 ? 'Required before starting' : 'Pending'}</Text></View></View></Card>)}<Button label="Check In" onPress={() => go('checkin')} /></ScrollView></>; }

function CheckIn({ go }: { go: (s: Screen) => void }) { const [customer, setCustomer] = useState('yes'); return <><Header title="Check-In" onBack={() => go('tasks')} /><ScrollView contentContainerStyle={styles.content}><Card><Text style={styles.cardTitle}>Customer availability</Text><Text style={styles.muted}>Is the customer available at the premises?</Text><Choice label="Yes, customer available" selected={customer === 'yes'} onPress={() => setCustomer('yes')} /><Choice label="No, customer unavailable" selected={customer === 'no'} onPress={() => setCustomer('no')} /></Card><Button label="Continue" onPress={() => go(customer === 'yes' ? 'checkout' : 'unavailable')} /></ScrollView></>; }

function Checkout({ go }: { go: (s: Screen) => void }) { const [meter, setMeter] = useState('yes'); return <><Header title="Check-Out" onBack={() => go('checkin')} /><ScrollView contentContainerStyle={styles.content}><Card><Text style={styles.cardTitle}>Meter availability</Text><Text style={styles.muted}>Is the meter available for inspection?</Text><Choice label="Yes" selected={meter === 'yes'} onPress={() => setMeter('yes')} /><Choice label="No" selected={meter === 'no'} onPress={() => setMeter('no')} /></Card><Field label="Remarks" placeholder="Add remarks" multiline /><Button label="Continue" onPress={() => go(meter === 'yes' ? 'execution' : 'site')} /></ScrollView></>; }

function Execution({ go }: { go: (s: Screen) => void }) { return <><Header title="Execution Details" onBack={() => go('checkout')} /><ScrollView contentContainerStyle={styles.content}><Card><Text style={styles.cardTitle}>Meter details</Text><Field label="Meter Number" placeholder="Enter meter number" /><Field label="Application Valve" placeholder="Select status" /><Field label="Meter Reading" placeholder="Enter reading" /></Card><Button label="Continue to Site Details" onPress={() => go('site')} /></ScrollView></>; }

function Site({ go }: { go: (s: Screen) => void }) { return <><Header title="Site Details" onBack={() => go('execution')} /><ScrollView contentContainerStyle={styles.content}><Card><Text style={styles.cardTitle}>Site information</Text><Field label="Leakage Location" placeholder="Select location" /><Field label="Material Used" placeholder="Enter material details" /><Field label="Remarks" placeholder="Add site remarks" multiline /></Card><Card><Text style={styles.cardTitle}>Photos</Text><Text style={styles.muted}>Attach supporting site photos.</Text><Button label="Add Photo" onPress={() => {}} secondary /></Card><Button label="Submit Work Order" onPress={() => go('submitted')} /></ScrollView></>; }

function Unavailable({ go }: { go: (s: Screen) => void }) { const [riser, setRiser] = useState('yes'); return <><Header title="Customer Unavailable" onBack={() => go('checkin')} /><ScrollView contentContainerStyle={styles.content}><Card><Text style={styles.cardTitle}>Riser activity possible?</Text><Text style={styles.muted}>Can the required riser activity be completed without the customer?</Text><Choice label="Yes" selected={riser === 'yes'} onPress={() => setRiser('yes')} /><Choice label="No" selected={riser === 'no'} onPress={() => setRiser('no')} /></Card><Button label="Continue" onPress={() => go(riser === 'yes' ? 'reason' : 'site')} /></ScrollView></>; }

function Reason({ go }: { go: (s: Screen) => void }) { const [reason, setReason] = useState(''); return <><Header title="Reason" onBack={() => go('unavailable')} /><ScrollView contentContainerStyle={styles.content}><Card><Text style={styles.cardTitle}>Reason for unavailability</Text><Choice label="Customer not at premises" selected={reason === 'absent'} onPress={() => setReason('absent')} /><Choice label="Access not available" selected={reason === 'access'} onPress={() => setReason('access')} /><Choice label="Other" selected={reason === 'other'} onPress={() => setReason('other')} />{reason === 'other' && <Field label="Reason" placeholder="Enter reason" multiline />}</Card><Button label="Submit" onPress={() => go('submitted')} /></ScrollView></>; }

function Submitted({ go }: { go: (s: Screen) => void }) { return <View style={styles.success}><View style={styles.successIcon}><Text style={styles.successIconText}>✓</Text></View><Text style={styles.successTitle}>Work order submitted</Text><Text style={styles.successText}>The work order has been recorded successfully.</Text><Button label="Back to Home" onPress={() => go('home')} /></View>; }

export default function App() {
  const { width } = useWindowDimensions();
  const [screen, setScreen] = useState<Screen>('home');
  const isTablet = width >= 768;
  const go = (s: Screen) => setScreen(s);
  const content = useMemo(() => {
    switch (screen) {
      case 'home': return <Home go={go} />;
      case 'premises': return <Premises go={go} />;
      case 'appointments': return <Appointments go={go} />;
      case 'tasks': return <Tasks go={go} />;
      case 'checkin': return <CheckIn go={go} />;
      case 'checkout': return <Checkout go={go} />;
      case 'execution': return <Execution go={go} />;
      case 'site': return <Site go={go} />;
      case 'unavailable': return <Unavailable go={go} />;
      case 'reason': return <Reason go={go} />;
      default: return <Submitted go={go} />;
    }
  }, [screen]);
  return <SafeAreaView style={styles.safe}><View style={[styles.app, isTablet && styles.tabletApp]}>{content}</View></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg }, app: { flex: 1, width: '100%', alignSelf: 'center' }, tabletApp: { maxWidth: 760 },
  header: { backgroundColor: C.blue, paddingHorizontal: 16, paddingVertical: 14 }, headerInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, headerTitle: { color: C.white, fontSize: 18, fontWeight: '700' }, back: { width: 36, height: 36, justifyContent: 'center' }, backText: { color: C.white, fontSize: 34, lineHeight: 34 },
  content: { padding: 16, paddingBottom: 32, gap: 14 }, time: { color: C.muted, fontSize: 14, fontWeight: '600', marginTop: 4 }, greeting: { color: C.text, fontSize: 22, lineHeight: 29, fontWeight: '700', marginBottom: 4 }, sectionTitle: { color: C.text, fontSize: 17, fontWeight: '700', marginTop: 8 }, stats: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, statCard: { flexGrow: 1, flexBasis: '46%', minHeight: 108, justifyContent: 'center' }, statValue: { color: C.text, fontSize: 28, fontWeight: '800' }, statLabel: { color: C.text, fontSize: 14, fontWeight: '700', marginTop: 2 }, statHint: { color: C.muted, fontSize: 12, marginTop: 4 },
  card: { backgroundColor: C.white, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: C.border, gap: 10 }, cardTitle: { color: C.text, fontSize: 16, fontWeight: '700' }, muted: { color: C.muted, fontSize: 13, lineHeight: 19 }, row: { color: C.text, fontSize: 14 }, badge: { alignSelf: 'flex-start', color: C.blueDark, backgroundColor: C.blueSoft, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 999, fontSize: 11, fontWeight: '800' },
  button: { minHeight: 48, borderRadius: 12, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, marginTop: 4 }, buttonSecondary: { backgroundColor: C.blueSoft, borderWidth: 1, borderColor: '#C9DDF0' }, buttonText: { color: C.white, fontSize: 15, fontWeight: '700' }, buttonTextSecondary: { color: C.blueDark },
  field: { gap: 7 }, fieldLabel: { color: C.text, fontSize: 13, fontWeight: '700' }, input: { minHeight: 48, borderWidth: 1, borderColor: C.border, borderRadius: 10, backgroundColor: C.white, paddingHorizontal: 13, color: C.text, fontSize: 14 }, textarea: { minHeight: 96, paddingTop: 13, textAlignVertical: 'top' }, choice: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 12 }, radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#94A3B8', alignItems: 'center', justifyContent: 'center' }, radioSelected: { borderColor: C.blue }, radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.blue }, choiceText: { color: C.text, fontSize: 14, flex: 1 }, taskRow: { flexDirection: 'row', alignItems: 'center', gap: 12 }, taskNumber: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.blueSoft, alignItems: 'center', justifyContent: 'center' }, taskNumberText: { color: C.blueDark, fontWeight: '800' }, success: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 14 }, successIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center' }, successIconText: { color: C.green, fontSize: 36, fontWeight: '800' }, successTitle: { color: C.text, fontSize: 23, fontWeight: '800', textAlign: 'center' }, successText: { color: C.muted, fontSize: 14, textAlign: 'center', lineHeight: 21, marginBottom: 10 }
});
