import useTheme from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react-native";
import colors from "tailwindcss/colors";
import { HStack } from './ui/hstack';
import { Icon } from "./ui/icon";
import { Switch } from './ui/switch';

export default function ThemeSlider() {
  const { theme, toggleTheme } = useTheme();

	return (
		<HStack space='xs' className="items-center">
      <Icon as={Sun} size="sm"/>
			<Switch
				trackColor={{ false: colors.gray[300], true: colors.gray[500] }}
				thumbColor={colors.gray[50]}
				// activeThumbColor={colors.gray[50]}
				ios_backgroundColor={colors.gray[300]}
        onValueChange={toggleTheme}
        defaultValue={theme !== 'dark'}
			/>
      <Icon as={Moon} size="sm"/>
		</HStack>
	);
}
