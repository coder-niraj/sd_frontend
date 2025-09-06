import { TextDecoder, TextEncoder } from 'util'; // Import from 'node:util' in newer Node.js
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;