import clipboardApi from '@/api/clipboard.api';
import ClipboardComponent from '@/components/ClipboardComponent';
import ConnectionIndicator from '@/components/ConnectionIndicator';
import TakePicture from '@/components/TakePicture';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import useBaseUrl from '@/hooks/useBaseUrl';
import useClipboards from '@/hooks/useClipboards';
import { FlashList } from '@shopify/flash-list';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Scissors } from 'lucide-react-native';
import { useEffect } from 'react';

export default function HomeScreen() {
	const { clipboards, addClipboard, latestClipboard } = useClipboards();
	const { isConnected, baseUrl } = useBaseUrl();

	const { data, status } = useQuery({
		queryKey: ['clipboards'],
		queryFn: () => clipboardApi.getLatestClipboard(),
		refetchInterval: 200,
	});

	const { mutate } = useMutation({
		mutationFn: (text: string) => clipboardApi.createClipboard(baseUrl, text),
	});

	useEffect(() => {
		if (status === 'success' && data && data !== latestClipboard) {
			mutate(data);
			addClipboard(data);
		}
	}, [data, status, latestClipboard, mutate, addClipboard]);

	return (
		<VStack className='mx-4 my-10 h-full'>
			<Icon as={Scissors} size='xl' />
			<Text className='text-4xl'>Welcome to Papan Klip</Text>
			<HStack>
				<ConnectionIndicator isConnected={isConnected} />
			</HStack>
			<Divider className='my-2' />
			<FlashList estimatedItemSize={50} data={clipboards} renderItem={({ item }) => <ClipboardComponent item={item} />} />
			<TakePicture />
		</VStack>
	);
}
