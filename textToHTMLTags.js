const fs = require("fs"); // Import the filesystem module to read and write files

// Input and output file names
const inputFileName = "input.txt";
const outputFileName = "output.txt";

// A list of valid HTML tags for validation
const validTags = ["table", "thead", "tbody", "tr", "td"];

// Read the content of the input file
fs.readFile(inputFileName, "utf8", (err, data) => {
    if (err) {
        console.error("Error when reading the file:", err.message);
        return;
    }

    // Split the file content into lines
    const lines = data.split("\n").map((line) => line.trimEnd()); // Remove trailing spaces for each line

    // Validate input format before processing
    const isValid = validateInput(lines);
    if (!isValid) {
        console.error("Invalid input format. Please ensure proper indentation and valid tags.");
        return;
    }

    // Generate HTML from the input lines
    const html = generateHTML(lines);

    // Write the generated HTML to the output file
    fs.writeFile(outputFileName, html, (err) => {
        if (err) {
            console.error("Error writing to the file:", err.message);
        } else {
            console.log(`HTML has been written to ${outputFileName}`);
        }
    });
});

// Function to convert the simplified input into HTML
function generateHTML(lines) {
    const stack = []; // Stack to track open tags and their indentation levels
    let html = ""; // String to build the resulting HTML

    lines.forEach((line) => {
        const indent = line.search(/\S/); // Determine the indentation level (spaces before the first non-space character)
        const content = line.trim(); // Remove leading and trailing spaces from the line

        // Skip empty lines
        if (!content) return;

        // Close tags when indentation decreases
        while (stack.length && stack[stack.length - 1].indent >= indent) {
            const last = stack.pop(); // Remove the last opened tag from the stack
            html += `${"  ".repeat(last.indent)}</${last.tag}>\n`; // Add the closing tag to the HTML
        }

        if (content.startsWith("td ")) { // Check if the line starts with 'td ' (indicates a table cell)
            const text = content.slice(3); // Extract the text after 'td '
            html += `${"  ".repeat(indent)}<td>${text}</td>\n`; // Add the <td> element with its content to the HTML
        } else { // For other tags (e.g., table, thead, tr, tbody)
            html += `${"  ".repeat(indent)}<${content}>\n`; // Add the opening tag to the HTML
            stack.push({ tag: content, indent }); // Push the tag and its indentation onto the stack
        }
    });

    // Close any remaining open tags in the stack
    while (stack.length) {
        const last = stack.pop(); // Remove the last opened tag from the stack
        html += `${"  ".repeat(last.indent)}</${last.tag}>\n`; // Add the closing tag to the HTML
    }

    return html; // Return the generated HTML
}

// Function to validate input lines
function validateInput(lines) {
    let previousIndent = -1; // Track the indentation of the previous line

    for (const line of lines) {
        const indent = line.search(/\S/); // Determine the indentation level
        const content = line.trim(); // Get the tag or text content

        // Skip empty lines
        if (!content) continue;

        // Check if the tag is valid
        if (!validTags.some((tag) => content === tag || content.startsWith("td "))) {
            console.error(`Invalid tag found: "${content}".`);
            return false;
        }

        // Check for invalid indentation (indent must not skip levels)
        if (indent > previousIndent + 2) {
            console.error(`Invalid indentation on line: "${line}".`);
            return false;
        }

        previousIndent = indent; // Update the previous indentation
    }

    return true; // Return true if no errors are found
}
