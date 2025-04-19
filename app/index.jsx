import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the sign-in page
  return <Redirect href="/sign-in" />;
} 