import clipboardApi from '@/api/clipboard.api';
import deviceApi from '@/api/device.api';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Divider } from '@/components/ui/divider';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import useBaseUrl from '@/hooks/useBaseUrl';
import useDevice from '@/hooks/useDevice';
import { Device } from '@/models/device.model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { MonitorCheck, MonitorOff } from 'lucide-react-native';
import { useState } from 'react';



export default function QrScannerScreen() {
	const [isScanned, setIsScanned] = useState(false);
	const [permission, requestPermission] = useCameraPermissions();
	const { setBaseUrl, setIsConnected, baseUrl } = useBaseUrl();
	const router = useRouter();
	const toast = useToast();
	const { setDevice } = useDevice();
	const queryClient = useQueryClient()

	const { mutate: addDevice } = useMutation({
		mutationFn: (device: Device) => deviceApi.addDevice(device),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['devices'] }),
	})

	const { mutate: ping } = useMutation({
		mutationFn: () => clipboardApi.ping(baseUrl),
		onSuccess: (data) => {
			if (data) {
				setBaseUrl(baseUrl);
				setIsConnected(true);
				
				data.url = baseUrl;
				
				addDevice(data);
				setDevice(data);
			}
			setIsScanned(false);
			showConnectStatusToast(true);
			router.back();
		},
		onError: () => {
			setBaseUrl('');
			setIsConnected(false);
			setIsScanned(false);
			showConnectStatusToast(false);
			router.back();
		},
	});

	const showConnectStatusToast = (isSuccess: boolean) => {
		const newId = Math.random();
		toast.show({
			id: newId.toString(),
			placement: 'top',
			duration: 1500,
			render: ({ id }) => {
				const uniqueToastId = `toast-${id}`;

				if (isSuccess) {
					return (
						<Toast action="success" nativeID={uniqueToastId} className="mt-10 px-5 py-3 gap-4 shadow-soft-1 items-center flex-row">
							<Icon as={MonitorCheck} size="xl" className="text-typography-50" />
							<Divider orientation="vertical" className="h-[30px] bg-outline-200" />
							<ToastTitle size="sm">Connected Succesfully</ToastTitle>
						</Toast>
					);
				} else {
					return (
						<Toast action="error" nativeID={uniqueToastId} className="mt-10 px-5 py-3 gap-4 shadow-soft-1 items-center flex-row max-w-96">
							<Icon as={MonitorOff} size="xl" className="text-typography-50" />
							<Divider orientation="vertical" className="h-[30px] bg-outline-200" />
							<ToastTitle size="sm">Failed to connect: invalid QR or device not on the same network</ToastTitle>
						</Toast>
					);
				}
			},
		});
	};

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
		ping();
	};

	return (
		<CameraView
			barcodeScannerSettings={{
				barcodeTypes: ['qr'],
			}}
			className="h-full w-full"
			facing="back"
			onBarcodeScanned={onQrCodeScanned}
		>
			<Center className="h-full w-full">
				<Box className="w-2/3 aspect-square bg-white opacity-50 rounded-lg shadow-lg"></Box>
			</Center>
		</CameraView>
	);
}
