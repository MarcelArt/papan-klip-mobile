import { useRouter } from 'expo-router';
import { GlobeIcon } from 'lucide-react-native';
import { Badge, BadgeIcon, BadgeText } from './ui/badge';
import { Pressable } from './ui/pressable';

interface ConnectionIndicatorProps {
	isConnected: boolean;
}

export default function ConnectionIndicator({ isConnected }: ConnectionIndicatorProps) {
	const router = useRouter();
	return (
		<Pressable onPress={() => router.navigate('/qr-scanner')}>
			<Badge className="mt-2" size="md" variant="outline" action={isConnected ? 'success' : 'error'}>
				<BadgeText>{isConnected ? 'Connected' : 'Disconnected'}</BadgeText>
				<BadgeIcon as={GlobeIcon} className="ml-2" />
			</Badge>
		</Pressable>
	);
}
