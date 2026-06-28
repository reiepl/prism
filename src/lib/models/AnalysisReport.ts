import { Blueprint } from "./blueprint";
import { AnalysisResult } from "../../analyzers/common/AnalysisResult";

export interface AnalysisReport {
    blueprint: Blueprint;

    analyses: AnalysisResult<unknown>[];
}