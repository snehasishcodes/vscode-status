const format = (text: string, status: any) => {
    if (!text || !status) return text ?? null;

    let elapsed;
    if (status?.type === "current") {
        const now = Date.now();
        const started = new Date(status.started ? status.started : new Date()).getTime();
        const diff = Math.floor((now - started) / 1000);
        const seconds = diff % 60;
        const minutes = Math.floor(diff / 60) % 60;
        const hours = Math.floor(diff / 3600);

        elapsed = `${hours > 0 ? `${hours}h` : ""} ${minutes > 0 ? `${minutes}m` : ""} ${seconds > 0 ? `${seconds}s` : ""}`;
    }

    const finalText = text
        .replace("{file}", `${status?.file?.name}.${status?.file?.extension}`)
        .replace("{fileName}", `${status?.file?.name}`)
        .replace("{fileExtension}", `${status?.file?.extension}`)
        .replace("{filePath}", `${status?.file?.name}.${status?.file?.extension}`)
        .replace("{language}", `${status?.file?.language}`)
        .replace("{size}", `${status?.file?.size}`)
        .replace("{lines}", `${status?.file?.lines}`)
        .replace("{currentLine}", `${status?.file?.position?.line}`)
        .replace("{currentCol}", `${status?.file?.position?.column}`)
        .replace("{errors}", `${status?.file?.errors}`)

        .replace("{workspaceName}", `${status?.workspace?.name}`)
        .replace("{workspacePath}", `${status?.workspace?.path}`)

        .replace("{debugging}", `${status?.debugging === true ? "Debugging" : "Not Debugging"}`)

        .replace("{startedTimestamp}", `${status?.started}`)
        .replace("{endedTimestamp}", `${status?.ended}`)
        .replace("{elapsedTime}", `${elapsed}`)

    return finalText;
}

export default format;