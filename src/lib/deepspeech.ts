import path from "path";

import DeepSpeech from "deepspeech";

export function createModel(modelDir: string) {
    const modelPath = path.join(modelDir, 'deepspeech-0.9.3-models.tflite');
    const scorerPath = path.join(modelDir, 'deepspeech-0.9.3-models.scorer');
    const model = new DeepSpeech.Model(modelPath);
    model.enableExternalScorer(scorerPath);
    return model;
}