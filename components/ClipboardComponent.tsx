import clipboardApi from '@/api/clipboard.api';
import useBaseUrl from '@/hooks/useBaseUrl';
import { Clipboard } from '@/models/clipboard.model';
import { isValidUrl, truncateString } from '@/utils/strings.util';
import { useMutation } from '@tanstack/react-query';
import { Copy } from 'lucide-react-native';
import { Card } from './ui/card';
import { HStack } from './ui/hstack';
import { Icon } from './ui/icon';
import { Image } from './ui/image';
import { Pressable } from './ui/pressable';
import { Text } from './ui/text';

interface ClipboardComponentProps {
	item: Clipboard;
}

export default function ClipboardComponent({ item }: ClipboardComponentProps) {
	const { baseUrl } = useBaseUrl();

	const { mutate } = useMutation({
		mutationFn: () => clipboardApi.openLink(baseUrl, item.content),
	});

	const onPressCopy = () => {
		console.log('item :>> ', item);
	};

	return (
		<Card variant='elevated' size='md' className='mb-2'>
			<HStack space='md' className='w-full justify-between'>
				{item.format === 'image' ? (
					<Image source={{ uri: item.content }} alt={item.format} className='aspect-video w-64' resizeMode='cover' />
				) : isValidUrl(item.content) ? (
					<Pressable onPress={() => mutate()}>
						<Text size='md' className='max-w-64 color-blue-500 underline'>
							{truncateString(item.content, 75)}
						</Text>
					</Pressable>
				) : (
					<Text size='md' className='max-w-64'>
						{truncateString(item.content, 75)}
					</Text>
				)}
				<Pressable onPress={onPressCopy}>
					{({ pressed }) => <Icon className={pressed ? 'opacity-50' : ''} as={Copy} size='xl' />}
				</Pressable>
			</HStack>
		</Card>
	);
}
