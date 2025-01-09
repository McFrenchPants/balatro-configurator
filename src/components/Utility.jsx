export function handleFileUpload(event, setData) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const content = e.target.result;
            const match = content.match(/self\.P_CENTERS\s*=\s*{([\s\S]*?)}\s*$/m);
            if (!match) throw new Error("Could not find P_CENTERS section");

            const parsedData = {};
            let currentPos = 0;
            const text = match[1];

            while (currentPos < text.length) {
                // Match object key
                const keyMatch = /(\w+)\s*=\s*{/.exec(text.slice(currentPos));
                if (!keyMatch) break;

                const key = keyMatch[1];
                currentPos += keyMatch[0].length + keyMatch.index;

                // Find matching closing brace
                let bracketCount = 1;
                let endPos = currentPos;

                while (bracketCount > 0 && endPos < text.length) {
                    if (text[endPos] === '{') bracketCount++;
                    if (text[endPos] === '}') bracketCount--;
                    endPos++;
                }

                const objectContent = text.slice(currentPos, endPos - 1);
                parsedData[key] = parseProperties(objectContent);
                currentPos = endPos;

                // Skip to next object
                const commaMatch = /\s*,\s*/.exec(text.slice(currentPos));
                if (commaMatch) {
                    currentPos += commaMatch[0].length;
                }
            }

            setData(parsedData);
        } catch (err) {
            console.error("Error parsing file:", err.message);
        }
    };

    reader.readAsText(file);
}

function parseProperties(content) {
    const properties = {};
    let currentPos = 0;

    while (currentPos < content.length) {
        // Match property key
        const keyMatch = /(\w+)\s*=\s*/.exec(content.slice(currentPos));
        if (!keyMatch) break;

        const key = keyMatch[1];
        currentPos += keyMatch[0].length + keyMatch.index;

        // Parse value based on type
        let value;
        if (content[currentPos] === '{') {
            // Handle nested object
            let bracketCount = 1;
            let endPos = currentPos + 1;

            while (bracketCount > 0 && endPos < content.length) {
                if (content[endPos] === '{') bracketCount++;
                if (content[endPos] === '}') bracketCount--;
                endPos++;
            }

            const nestedContent = content.slice(currentPos + 1, endPos - 1);
            value = parseProperties(nestedContent);
            currentPos = endPos;
        } else {
            // Handle primitive values
            const valueMatch = /([^,}]+)/.exec(content.slice(currentPos));
            const rawValue = valueMatch[1].trim();
            
            // Convert to appropriate type
            if (rawValue === 'true') value = true;
            else if (rawValue === 'false') value = false;
            else if (!isNaN(rawValue)) value = Number(rawValue);
            else value = rawValue.replace(/['"]/g, '');

            currentPos += valueMatch[0].length;
        }

        properties[key] = value;

        // Skip comma and whitespace
        const commaMatch = /\s*,\s*/.exec(content.slice(currentPos));
        if (commaMatch) {
            currentPos += commaMatch[0].length;
        }
    }

    return properties;
}