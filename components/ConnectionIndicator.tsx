import { GlobeIcon } from 'lucide-react-native';
import { Badge, BadgeIcon, BadgeText } from './ui/badge';

interface ConnectionIndicatorProps {
	isConnected: boolean;
}

export default function ConnectionIndicator({ isConnected }: ConnectionIndicatorProps) {
	return (
		<Badge className='mt-2 w-fit' size="md" variant="outline" action={isConnected ? 'success' : 'error'}>
			<BadgeText>{isConnected ? 'Connected' : 'Disconnected'}</BadgeText>
			<BadgeIcon as={GlobeIcon} className="ml-2" />
		</Badge>
	);
}
