import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const linuxLogo = require("@/assets/images/linux.png");
const unlink = require("@/assets/images/unlink.png");

interface DeviceCardProps {
  user?: string;
  product?: string;
  os?: string;
  disconnected: boolean;
}

export default function DeviceCard({ disconnected, os, product, user }: DeviceCardProps) {
	return (
		<Card variant='elevated' size='md' className='my-2'>
			<HStack className='items-center' space='lg'>
				<Avatar className='bg-transparent'>
					<AvatarFallbackText>user</AvatarFallbackText>
					<AvatarImage source={disconnected ? unlink : linuxLogo} />
					<AvatarBadge className={disconnected ? 'bg-error-500' : ''} />
				</Avatar>
				<VStack>
					<Text className='text-lg font-semibold'>{user}</Text>
					<Text className='text-sm text-gray-500'>{product}</Text>
					<Text className='text-sm text-gray-500'>{os}</Text>
				</VStack>
			</HStack>
		</Card>
	);
}
