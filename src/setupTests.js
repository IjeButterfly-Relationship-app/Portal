import "@testing-library/jest-dom";

// Mock axios globally
jest.mock("axios", () => ({
  post: jest.fn(),
  get: jest.fn(),
}));
