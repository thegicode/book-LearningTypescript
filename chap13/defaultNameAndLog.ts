function defaultNameAndLog(nameMaybe: string | undefined) {
    const name = nameMaybe ?? "anonymouse";
    console.log("Form", nameMaybe, "to", name);
    return name;
}
