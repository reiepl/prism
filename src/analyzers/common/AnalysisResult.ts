export interface AnalysisResult<TScore> {

    analyzerId: string;

    score: TScore;

    evidence: Evidence[];

    metadata: AnalysisMetadata;
}