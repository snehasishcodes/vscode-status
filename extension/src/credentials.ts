import config from "./config";
import log, { LogLevel } from "./log";

export default async function credentials() {
    const res = await fetch(`${config.api_url}/credentials`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        log(LogLevel.Error, "Could not generate credentials.");
    }

    const data = await res.json();
    console.log(data);

    return data as { id: string, token: string };
}