import { Analyzer } from "./Analyzer";
import { AnalysisContext } from "./AnalysisContext";
import { AnalysisResult } from "./AnalysisResult";

export class MockAnalyzer implements Analyzer<AnalysisContext, AnalysisResult<string>> {
  readonly id = "mock";
  readonly name = "Mock Analyzer";
  readonly version = "1.0.0";

  async analyze(_: AnalysisContext): Promise<AnalysisResult<string>> {
    return {
      analyzerId: this.id,
      score: "OK",
      evidence: [],
      metadata: {}
    };
  }
}