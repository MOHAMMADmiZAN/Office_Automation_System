import {afterEach, expect} from 'vitest';
import {cleanup} from '@testing-library/react';
import matchers, {TestingLibraryMatchers} from '@testing-library/jest-dom/matchers';

// extends Vitest's expect method with methods from react-testing-library
declare global {
    namespace Vi {
        interface JestAssertion<T = any>
            extends jest.Matchers<void, T>,
                TestingLibraryMatchers<T, void> {
        }
    }
}
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});