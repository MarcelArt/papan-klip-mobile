import { Device } from "@/models/device.model";
import { create } from "zustand";

interface DeviceState {
  device?: Device
  setDevice: (device: Device) => void;
}

const useDevice = create<DeviceState>()((set) => ({
  device: undefined,
  setDevice: (device: Device) => set({ device }),
}));
export default useDevice;