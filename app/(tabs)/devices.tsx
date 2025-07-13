import ConnectionIndicator from '@/components/ConnectionIndicator';
import DeviceCard from '@/components/DeviceCard';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import useBaseUrl from '@/hooks/useBaseUrl';
import useDevice from '@/hooks/useDevice';
import { Scissors } from 'lucide-react-native';

export default function DevicesScreen() {
	const { isConnected } = useBaseUrl();
	const { device } = useDevice();

	return (
		<VStack className='mx-4 my-10 h-full'>
			<Icon as={Scissors} size='xl' />
			<Text className='text-3xl'>Devices</Text>
			<HStack>
				<ConnectionIndicator isConnected={isConnected} />
			</HStack>
			<Divider className='my-2' />
			<Text className='text-2xl'>Current</Text>
			<DeviceCard disconnected={!isConnected} os={device?.os} product={device?.product} user={device?.user} />
			<Divider className='my-2' />
			<Text className='text-2xl'>Recently Used</Text>
		</VStack>
	);
}
