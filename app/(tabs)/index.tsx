
import clipboardApi from '@/api/clipboard.api';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function HomeScreen() {
  const [clipboards, setClipboards] = useState<string[]>([]);

  const { data, status } = useQuery({
    queryKey: ['clipboards'],
    queryFn: () => clipboardApi.getLatestClipboard(),
    refetchInterval: 200,
  });

  if (status === 'success') {
    if (data !== clipboards[0]) {
      setClipboards((prev) => [data, ...prev]);
    }
  }

  return (
    <VStack className='mx-4 my-10'>
      <Text>Clipboard History</Text>
      {clipboards.map((clipboard, index) => <Text key={index.toString()}>{clipboard}</Text>)}
    </VStack>
  );
}
