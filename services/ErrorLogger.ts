// import * as FileSystem from 'expo-file-system';

// async function logErrorToFile(error: any, filename: string = 'error.log') {
//     const timestamp = new Date().toISOString();
//     const logMessage = `${timestamp}: ${JSON.stringify(error, null, 2)}\n`;
//     const fileUri = `${FileSystem.documentDirectory}${filename}`;

//     try {
//         await FileSystem.appendToFileAsync(fileUri, logMessage, { encoding: FileSystem.EncodingType.UTF8 }); // Correct method name
//         console.error("Error logged to file:", error);  // Keep this for console logging as well
//     } catch (writeError) {
//         console.error("Error writing to log file:", writeError);
//     }
// }

// export { logErrorToFile };
