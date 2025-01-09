export function handleFileUpload(event, setData) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const content = e.target.result;
            // Find the P_CENTERS section
            const match = content.match(/self\.P_CENTERS\s*=\s*{([\s\S]*?)}\s*$/m);

            if (!match) throw new Error("Could not find P_CENTERS section");

            const parsedData = {};
            const objectPattern = /(\w+)\s*=\s*{([^}]*)}/g; // Match objects
            const objects = match[1].matchAll(objectPattern);

            for (const obj of objects) {
                const key = obj[1];
                const properties = obj[2];
                const itemData = {};

                console.log("key:", key, "properties:", properties);

                // Improved regex to match nested objects
                const propertyPattern = /(\w+)\s*=\s*(\{[^}]*\}|[^,{}]+)/g;
                const props = properties.matchAll(propertyPattern);

                for (const prop of props) {
                    const [_, propKey, rawValue] = prop;
                    if (propKey && rawValue) {
                        const parsedValue = parseValue(rawValue.trim());
                        itemData[propKey] = parsedValue;
                    }
                }

                parsedData[key] = itemData;
            }

            setData(parsedData);
            console.log("Loaded game data:", parsedData);
        } catch (err) {
            console.error("Error parsing file:", err.message);
        }
    };

    reader.readAsText(file);
}

function parseValue(value) {
    // Check if the value looks like an object (it contains '{' and '}')
    if (value.includes("{") && value.includes("}")) {
        console.warn("Detected potential object:", value);
        return parseObject(value);  // Handle object parsing
    }

    // Handle booleans
    if (value === "true") return true;
    if (value === "false") return false;

    // Handle numbers
    if (!isNaN(value)) return Number(value);

    // Handle strings (remove quotes)
    return value.replace(/['"]/g, "");
}

function parseObject(value) {
    const objectData = {};
    const innerPattern = /(\w+)\s*=\s*([^,{}]+)/g;
    
    // Log the object to see how it's being detected
    console.log("Parsing object:", value);

    const matches = value.matchAll(innerPattern);
    for (const match of matches) {
        const [_, key, val] = match;
        // Recursively parse if the value looks like another object
        objectData[key] = parseValue(val.trim());
    }

    return objectData;
}
