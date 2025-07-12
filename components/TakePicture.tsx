import { useRouter } from 'expo-router';
import { Aperture, Image } from 'lucide-react-native';
import { useState } from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetIcon,
  ActionsheetItem,
  ActionsheetItemText,
} from './ui/actionsheet';
import { Fab, FabIcon } from './ui/fab';

export default function TakePicture() {
	const [isActionShown, setIsActionShown] = useState(false);
  const router = useRouter();

	const onClose = () => setIsActionShown(false);

  const onPressCamera = () => {
    router.navigate('/camera');
    onClose();
  }

	return (
		<>
			<Actionsheet isOpen={isActionShown} onClose={onClose} className='pb-10'>
				<ActionsheetBackdrop />
				<ActionsheetContent>
					<ActionsheetDragIndicatorWrapper>
						<ActionsheetDragIndicator />
					</ActionsheetDragIndicatorWrapper>
					<ActionsheetItem onPress={onClose}>
						<ActionsheetIcon as={Image} size='xl' />
						<ActionsheetItemText size='lg'>Gallery</ActionsheetItemText>
					</ActionsheetItem>
					<ActionsheetItem onPress={onPressCamera}>
						<ActionsheetIcon as={Aperture} size='xl' />
						<ActionsheetItemText size='lg'>Camera</ActionsheetItemText>
					</ActionsheetItem>
				</ActionsheetContent>
			</Actionsheet>
			<Fab size='lg' placement='bottom right' className='mb-10' onPress={() => setIsActionShown(true)}>
				<FabIcon as={Image} />
			</Fab>
		</>
	);
}
