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
import { FlashList } from '@shopify/flash-list';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Scissors } from 'lucide-react-native';
import { useState } from 'react';

export default function HomeScreen() {
	const [clipboards, setClipboards] = useState<string[]>([]);
	const { isConnected, baseUrl } = useBaseUrl();

	const { data, status } = useQuery({
		queryKey: ['clipboards'],
		queryFn: () => clipboardApi.getLatestClipboard(),
		refetchInterval: 200,
	});

	const { mutate } = useMutation({
		mutationFn: (text: string) => clipboardApi.createClipboard(baseUrl, text),
	});

	if (status === 'success') {
		if (data && data !== clipboards[0]) {
			mutate(data);
			setClipboards((prev) => [data, ...prev]);
		}
	}

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
