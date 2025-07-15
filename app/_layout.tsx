import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

const queryClient = new QueryClient();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});
	// const { theme } = useTheme();

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<GluestackUIProvider mode='light'>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<QueryClientProvider client={queryClient}>
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="qr-scanner" options={{ headerShown: false }} />
						<Stack.Screen name="camera" options={{ headerShown: false }} />
						<Stack.Screen name="image-preview" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" />
					</Stack>
				</QueryClientProvider>
				<StatusBar style="auto" />
			</ThemeProvider>
		</GluestackUIProvider>
	);
}
