import axios from 'axios';
import * as Clipboard from 'expo-clipboard';

async function getLatestClipboard(): Promise<string> {
    const content = await Clipboard.getStringAsync();
    return content;
}

async function ping(baseUrl: string): Promise<boolean> {
    const res = await axios.get(`${baseUrl}`);
    return res.status === 200;
}

async function createClipboard(baseUrl: string, text: string): Promise<boolean> {
    const res = await axios.post(`${baseUrl}/clipboard`, { text });
    return res.status === 201;
}

const clipboardApi ={
    getLatestClipboard,
    ping,
    createClipboard,
};
export default clipboardApi;