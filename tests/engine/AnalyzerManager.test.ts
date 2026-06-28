describe("AnalyzerManager", () => {
    it("registers an analyzer", () => {
        const manager = new AnalyzerManager();

        manager.register(new MockAnalyzer());

        expect(manager.has("mock")).toBe(true);
    });
});