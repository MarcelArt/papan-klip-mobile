export function truncateString(text: string, maxLength: number): string {
	if (text.length <= maxLength) {
		return text;
	}

	return text.slice(0, maxLength) + '...';
}

export function isValidUrl(text: string): boolean {
	try {
		new URL(text);
		return true;
	} catch {
		return false;
	}
}
