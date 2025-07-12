import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Fab, FabIcon } from '@/components/ui/fab';
import { Text } from '@/components/ui/text';
import useImagePreview from '@/hooks/useImagePreview';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Aperture, SwitchCamera } from 'lucide-react-native';
import { useRef, useState } from 'react';

export default function CameraScreen() {
	const [permission, requestPermission] = useCameraPermissions();
	const [isFront, setIsFront] = useState(false);
	const ref = useRef<CameraView>(null);
  const { setImageUri } = useImagePreview();
  const router = useRouter();

	const onSwitchCamera = () => setIsFront(!isFront);

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync({ quality: 0.5 });
    setImageUri(photo?.uri ?? '');
    router.navigate('/image-preview');
  };


	if (!permission) {
		return <Box></Box>;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<Center>
				<Text>We need your permission to show the camera</Text>
				<Button onPress={requestPermission}>
					<ButtonText>Grant Permission</ButtonText>
				</Button>
			</Center>
		);
	}

	return (
		<CameraView className='h-full w-full' facing={isFront ? 'front' : 'back'} ref={ref}>
			<Center className='h-full w-full'>
				<Fab size='lg' placement='bottom center' className='mb-10 p-5' onPress={takePicture}>
					<FabIcon size='xl' as={Aperture} />
				</Fab>
				<Fab size='md' placement='bottom right' className='mb-12' onPress={onSwitchCamera}>
					<FabIcon size='lg' as={SwitchCamera} />
				</Fab>
			</Center>
		</CameraView>
	);
}
