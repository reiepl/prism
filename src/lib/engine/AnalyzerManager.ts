import { Analyzer } from "@/analyzers/common";

export class AnalyzerManager {
  private readonly analyzers = new Map<string, Analyzer<any, any>>();

  /**
   * Register a new analyzer.
   * Throws if an analyzer with the same id already exists.
   */
  register(analyzer: Analyzer<any, any>): void {
    if (this.analyzers.has(analyzer.id)) {
      throw new Error(
        `Analyzer '${analyzer.id}' is already registered.`
      );
    }

    this.analyzers.set(analyzer.id, analyzer);
  }

  /**
   * Remove an analyzer.
   */
  unregister(id: string): void {
    this.analyzers.delete(id);
  }

  /**
   * Get an analyzer by id.
   */
  get(id: string): Analyzer<any, any> | undefined {
    return this.analyzers.get(id);
  }

  /**
   * Returns true if registered.
   */
  has(id: string): boolean {
    return this.analyzers.has(id);
  }

  /**
   * Returns all registered analyzers.
   */
  getAll(): Analyzer<any, any>[] {
    return Array.from(this.analyzers.values());
  }

  /**
   * Remove all analyzers.
   * Mainly useful for testing.
   */
  clear(): void {
    this.analyzers.clear();
  }
}