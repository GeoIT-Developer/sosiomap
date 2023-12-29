export enum LoadingState {
    UNDEFINED,
    LOADING,
    SUCCESS,
    FAILURE,
}

export const isLoadingSuccess = (loadingState: LoadingState) =>
    LoadingState.SUCCESS === loadingState;

export const isLoadingFailure = (loadingState: LoadingState) =>
    LoadingState.FAILURE === loadingState;

export default LoadingState;
