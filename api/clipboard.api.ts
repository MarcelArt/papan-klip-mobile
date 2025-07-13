import { Device } from '@/models/device.model';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';

async function getLatestClipboard(): Promise<string> {
	const content = await Clipboard.getStringAsync();
	return content;
}

async function ping(baseUrl: string): Promise<Device> {
	const res = await axios.get(`${baseUrl}`);
	return res.data;
}

async function createClipboard(baseUrl: string, text: string): Promise<boolean> {
	const res = await axios.post(`${baseUrl}/clipboard`, { text });
	return res.status === 201;
}

async function createPictureClipboard(baseUrl: string, imageUri: string): Promise<boolean> {
	const res = await FileSystem.uploadAsync(`${baseUrl}/clipboard/img`, imageUri, {
		fieldName: 'file',
		httpMethod: 'POST',
		uploadType: FileSystem.FileSystemUploadType.MULTIPART,
		headers: {
			'Accept': 'application/json',
		}
	});

	return res.status === 201
}

async function openLink(baseUrl: string, link: string): Promise<boolean> {
	const res = await axios.post(`${baseUrl}/clipboard/open`, { text: link });
	return res.status === 204;
}

const clipboardApi = {
	getLatestClipboard,
	ping,
	createClipboard,
	createPictureClipboard,
	openLink,
};
export default clipboardApi;
