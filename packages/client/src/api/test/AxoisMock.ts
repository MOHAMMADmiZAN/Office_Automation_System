const axiosMock = {
    default: {
        create: vi.fn(() => ({
            interceptors: {
                request: {use: vi.fn(), eject: vi.fn()},
                response: {use: vi.fn(), eject: vi.fn()},
            },
            post: vi.fn(),
            put: vi.fn(),
            get: vi.fn(),
            delete: vi.fn(),
        })),
    },
};

export default axiosMock;