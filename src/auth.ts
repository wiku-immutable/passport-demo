import { providerStore, passportStore, buttonState } from "./store";
import { get } from "svelte/store";

export async function login(): Promise<void> {
    buttonState.update(() => "Connecting...");
    const passport = get(passportStore);

    let provider = await passport.connectImx();
    console.log('provider after popup connect', provider);

    providerStore.set(provider);
    buttonState.update(() => "Connected");
}
export async function logout(): Promise<void> {
    const passport = get(passportStore);
    await passport.logout();
    providerStore.set(null);
    buttonState.update(() => "Connect Passport");
}

export async function handleLoginCallback(): Promise<void> {
    try {
        console.log("login callback");
        const passport = get(passportStore);
        await passport.loginCallback();
    }
    catch (err) {
        console.error("login callback error", err);
    }
}