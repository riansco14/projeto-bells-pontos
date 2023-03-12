import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export async function runDetector(image) {
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;

    const detectorConfig = {
        runtime: 'tfjs',
    };

    const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);

    const estimationConfig = {flipHorizontal: false};
    const faces = await detector.estimateFaces(image, estimationConfig);

    console.log(faces);

    return faces
}   