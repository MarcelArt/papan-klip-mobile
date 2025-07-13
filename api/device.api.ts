import { Device } from '@/models/device.model';
import * as SecureStore from 'expo-secure-store';

const DEVICE_STORAGE_KEY = 'devices';

async function saveDevices(devices: Device[]): Promise<void> {
  await SecureStore.setItemAsync(DEVICE_STORAGE_KEY, JSON.stringify(devices));
}

async function getDevices(): Promise<Device[]> {
  const deviceJson = await SecureStore.getItemAsync(DEVICE_STORAGE_KEY);
  if (!deviceJson) {
    return [];
  }

  return JSON.parse(deviceJson) as Device[];
}

async function addDevice(device: Device): Promise<void> {
  console.log('device :>> ', device);
  let devices = await getDevices();

  let oldDevice = devices.find(d => d.url === device.url);
  if (oldDevice) {
    oldDevice.os = device.os;
    oldDevice.product = device.product;
    oldDevice.user = device.user;
    oldDevice.type = device.type;
  } else {
    devices = [device, ...devices];
  }

  await saveDevices(devices);
}

const deviceApi = {
  saveDevices,
  getDevices,
  addDevice,
}
export default deviceApi;