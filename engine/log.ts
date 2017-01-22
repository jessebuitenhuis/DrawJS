var enabled = true;

export function log(message : any) {
    if (!enabled) return false;

    console.log(message);
}