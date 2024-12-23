const format = (text, status) => {
    if (!text || !status) return text ?? null;

    let elapsed;
    if (status?.type === "current") {
        const now = Date.now();
        const started = status?.started ? parseInt(status.started, 10) : now;
        const diff = Math.floor((now - started) / 1000);
        const seconds = diff % 60;
        const minutes = Math.floor(diff / 60) % 60;
        const hours = Math.floor(diff / 3600);

        elapsed = `${hours > 0 ? `${hours}h` : ""} ${minutes > 0 ? `${minutes}m` : ""} ${seconds > 0 ? `${seconds}s` : ""}`;
    }

    const finalText = text
        .replaceAll("{file}", `${status?.file?.name}.${status?.file?.extension}`)
        .replaceAll("{fileName}", `${status?.file?.name}`)
        .replaceAll("{fileExtension}", `${status?.file?.extension}`)
        .replaceAll("{filePath}", `${status?.file?.name}.${status?.file?.extension}`)
        .replaceAll("{language}", `${status?.file?.language}`)
        .replaceAll("{size}", `${status?.file?.size}`)
        .replaceAll("{lines}", `${status?.file?.lines}`)
        .replaceAll("{currentLine}", `${status?.file?.position?.line}`)
        .replaceAll("{currentCol}", `${status?.file?.position?.column}`)
        .replaceAll("{errors}", `${status?.file?.errors}`)

        .replaceAll("{workspaceName}", `${status?.workspace?.name}`)
        .replaceAll("{workspacePath}", `${status?.workspace?.path}`)

        .replaceAll("{debugging}", `${status?.debugging === true ? "Debugging" : "Not Debugging"}`)

        .replaceAll("{startedTimestamp}", `${status?.started}`)
        .replaceAll("{endedTimestamp}", `${status?.ended}`)
        .replaceAll("{elapsedTime}", `${elapsed}`)

    return finalText;
}

module.exports = format;