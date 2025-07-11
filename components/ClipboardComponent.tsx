import { Copy } from 'lucide-react-native';
import { Card } from './ui/card';
import { HStack } from './ui/hstack';
import { Icon } from './ui/icon';
import { Pressable } from './ui/pressable';
import { Text } from './ui/text';

interface ClipboardComponentProps {
	item: string;
}

export default function ClipboardComponent({ item }: ClipboardComponentProps) {
	const onPressCopy = () => {
		console.log('item :>> ', item);
	};

	return (
		<Card variant="elevated" size="md" className='mb-2'>
			<HStack space="md" className="w-full justify-between">
				<Text size="lg">{item}</Text>
				<Pressable onPress={onPressCopy}>
					{({ pressed }) => <Icon className={pressed ? 'opacity-50' : ''} as={Copy} size="xl" />}
				</Pressable>
			</HStack>
		</Card>
	);
}
