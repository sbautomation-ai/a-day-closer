import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill for packages (e.g. pg) that expect Web Crypto globals in the test environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// jsdom does not implement the Clipboard API — provide a minimal stub
// so tests can spy on navigator.clipboard.writeText
Object.defineProperty(global.navigator, "clipboard", {
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
    readText: jest.fn().mockResolvedValue(""),
  },
  configurable: true,
  writable: true,
});
