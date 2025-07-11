import clipboardApi from '@/api/clipboard.api';
import ClipboardComponent from '@/components/ClipboardComponent';
import { Divider } from '@/components/ui/divider';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { Scissors } from 'lucide-react-native';
import { useState } from 'react';

export default function HomeScreen() {
	const [clipboards, setClipboards] = useState<string[]>([]);

	const { data, status } = useQuery({
		queryKey: ['clipboards'],
		queryFn: () => clipboardApi.getLatestClipboard(),
		refetchInterval: 200,
	});

	if (status === 'success') {
		if (data && data !== clipboards[0]) {
			setClipboards((prev) => [data, ...prev]);
		}
	}

	return (
		<VStack className="mx-4 my-10 h-full">
      <Icon as={Scissors} size='xl'/>
			<Text className='text-4xl'>Welcome to Papan Klip</Text>
      <Divider className='my-2'/>
			<FlashList data={clipboards} renderItem={({ item }) => <ClipboardComponent item={item}/>} />
		</VStack>
	);
}
