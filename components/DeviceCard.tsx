import clipboardApi from "@/api/clipboard.api";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const linuxLogo = require("@/assets/images/linux.png");
const unlink = require("@/assets/images/unlink.png");
const windowsLogo = require("@/assets/images/windows.png");

interface DeviceCardProps {
  user?: string;
  product?: string;
  os?: string;
	url?: string;
	type?: 'unix' | 'win';
}

export default function DeviceCard({ os, product, user, url, type }: DeviceCardProps) {	
	const logos = {
		unix: linuxLogo,
		win: windowsLogo,
		none: unlink,
	}
	const { data } = useQuery({
		queryKey: ['ping', url],
		queryFn: () => clipboardApi.ping(url!),
		refetchInterval: 3000,
	});

	return (
		<Card variant='elevated' size='md' className='my-2'>
			<HStack className='items-center' space='lg'>
				<Avatar className='bg-transparent'>
					<AvatarFallbackText>user</AvatarFallbackText>
					<AvatarImage source={logos[type ?? 'none']} />
					<AvatarBadge className={!data ? 'bg-error-500' : ''} />
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
