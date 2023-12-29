export enum ProcessingState {
    UNDEFINED,
    IN_PROGRESS,
    SUCCESS,
    FAILURE,
}

export const isProcessingSuccess = (processingState: ProcessingState) =>
    ProcessingState.SUCCESS === processingState;

export default ProcessingState;
