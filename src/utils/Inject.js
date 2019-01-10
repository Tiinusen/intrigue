var alreadyImported = [];

export function InjectScript(src) {
    if (alreadyImported.indexOf(src) !== -1) {
        return;
    }
    alreadyImported.push(src);
    let script = document.createElement("script");
    script.setAttribute(
        "src",
        src
    );
    document.head.appendChild(script);
}