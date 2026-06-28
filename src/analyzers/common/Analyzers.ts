export interface Analyzer<TInput, TResult> {
  readonly id: string;
  readonly name: string;
  readonly version: string;

  analyze(input: TInput): Promise<TResult>;
}