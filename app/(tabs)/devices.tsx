import deviceApi from '@/api/device.api';
import ConnectionIndicator from '@/components/ConnectionIndicator';
import DeviceCard from '@/components/DeviceCard';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import useBaseUrl from '@/hooks/useBaseUrl';
import useDevice from '@/hooks/useDevice';
import { FlashList } from '@shopify/flash-list';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Scissors, Trash2 } from 'lucide-react-native';

export default function DevicesScreen() {
	const { isConnected } = useBaseUrl();
	const { device } = useDevice();
	const queryClient = useQueryClient();

	const { data, status } = useQuery({
		queryKey: ['devices'],
		queryFn: () => deviceApi.getDevices(),
	});

	const { mutate } = useMutation({
		mutationFn: () => deviceApi.saveDevices([]),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['devices'] }),
	})

	return (
		<VStack className='mx-4 my-10 h-full'>
			<Icon as={Scissors} size='xl' />
			<Text className='text-3xl'>Devices</Text>
			<HStack>
				<ConnectionIndicator isConnected={isConnected} />
			</HStack>
			<Divider className='my-2' />
			<Text className='text-2xl'>Current</Text>
			<DeviceCard url={device?.url} os={device?.os} product={device?.product} user={device?.user} type={device?.type} />
			<Divider className='my-2' />
			<HStack className='items-center justify-between'>
				<Text className='text-2xl'>Recently Used</Text>
				<Button size='xs' variant="outline" action="negative" onPress={() => mutate()}>
					<ButtonIcon as={Trash2}/>
					<ButtonText className='text-error-600'>Clear</ButtonText>
				</Button>
			</HStack>
			{status === 'success' ? (
				<FlashList
					estimatedItemSize={50}
					data={data}
					renderItem={({ item }) => <DeviceCard url={device?.url} os={item.os} product={item.product} user={item.user} type={device?.type} />}
				></FlashList>
			) : null}
		</VStack>
	);
}
