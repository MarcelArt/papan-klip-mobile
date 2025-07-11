import clipboardApi from '@/api/clipboard.api';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import useBaseUrl from '@/hooks/useBaseUrl';
import { useMutation } from '@tanstack/react-query';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function QrScannerScreen() {
  const [isScanned, setIsScanned] = useState(false);

	const [permission, requestPermission] = useCameraPermissions();

  const { setBaseUrl, setIsConnected, baseUrl } = useBaseUrl();

  const router = useRouter(); 

  const { mutate } = useMutation({
    mutationFn: () => clipboardApi.ping(baseUrl),
    onSuccess: (ok) => {
      if (ok) {
        setBaseUrl(baseUrl);
        setIsConnected(true);
      }
      setIsScanned(false);
      router.back();
    },
    onError: () => {
      setBaseUrl('');
      setIsConnected(false);
      setIsScanned(false);
      router.back();
    }
  });

	if (!permission) {
		return <Box></Box>;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<Box>
				<Text>We need your permission to show the camera</Text>
				<Button onPress={requestPermission}>
					<ButtonText>Grant Permission</ButtonText>
				</Button>
			</Box>
		);
	}

  const onQrCodeScanned = (result: BarcodeScanningResult) => {
    if (isScanned) return;

    setIsScanned(true);
    setBaseUrl(result.data);
    mutate();
  }

	return (
		<CameraView
			barcodeScannerSettings={{
				barcodeTypes: ['qr'],
			}}
			className="h-full w-full"
			facing="back"
      onBarcodeScanned={onQrCodeScanned}
		>
			<Center className="h-full w-full"></Center>
		</CameraView>
	);
}
