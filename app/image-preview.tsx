import clipboardApi from '@/api/clipboard.api';
import { Center } from '@/components/ui/center';
import { Divider } from '@/components/ui/divider';
import { Fab, FabIcon } from '@/components/ui/fab';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import useBaseUrl from '@/hooks/useBaseUrl';
import useClipboards from '@/hooks/useClipboards';
import useImagePreview from '@/hooks/useImagePreview';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Check, Trash2, X } from 'lucide-react-native';

export default function ImagePreviewScreen() {
	const { imageUri, setImageUri } = useImagePreview();
  const { baseUrl } = useBaseUrl();
  const router = useRouter();
	const toast = useToast();
	const { addClipboard } = useClipboards();
  
  const showToast = (isSuccess: boolean) => {
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
							<Icon as={Check} size="xl" className="text-typography-50" />
							<Divider orientation="vertical" className="h-[30px] bg-outline-200" />
							<ToastTitle size="sm">Image copied to your device</ToastTitle>
						</Toast>
					);
				} else {
					return (
						<Toast action="error" nativeID={uniqueToastId} className="mt-10 px-5 py-3 gap-4 shadow-soft-1 items-center flex-row max-w-96">
							<Icon as={X} size="xl" className="text-typography-50" />
							<Divider orientation="vertical" className="h-[30px] bg-outline-200" />
							<ToastTitle size="sm">Failed to copy: not connected to device</ToastTitle>
						</Toast>
					);
				}
			},
		});
	};

  const { mutate } = useMutation({
    mutationFn: () => clipboardApi.createPictureClipboard(baseUrl, imageUri),
    onSuccess: () => {
      showToast(true);
			addClipboard({
				content: imageUri,
				format: 'image',
			});
      setImageUri(''); // Clear the image URI after successful upload
      router.navigate('/'); // Navigate back to the home screen
    },
    onError: (e) => {
      console.log('e :>> ', e);
      showToast(false);
      setImageUri(''); // Clear the image URI on error
      router.navigate('/'); // Navigate back to the home screen
    }
  });

  const onPressOk = () => {
    mutate();
  }

  const onPressCancel = () => {
    setImageUri(''); // Clear the image URI
    router.navigate('/'); // Navigate back to the home screen
  }

  if (!imageUri) {
    return <Center className='h-full w-full'/>
  }

	return (
		<Center className='h-full w-full'>
			<Image source={{ uri: imageUri }} className='w-full h-full' resizeMode='cover' alt='Preview'/>
			<Fab size='lg' placement='bottom center' className='mb-10 p-5' onPress={onPressOk}>
				<FabIcon size='xl' as={Check} />
			</Fab>
			<Fab size='md' placement='bottom right' className='mb-12' onPress={onPressCancel}>
				<FabIcon size='lg' as={Trash2} />
			</Fab>
		</Center>
	);
}
