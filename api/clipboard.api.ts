import * as Clipboard from 'expo-clipboard';

async function getLatestClipboard(): Promise<string> {
    const content = await Clipboard.getStringAsync();
    return content;
}

const clipboardApi ={
    getLatestClipboard,
};
export default clipboardApi;