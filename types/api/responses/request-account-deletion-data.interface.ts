export enum RequestAccountDeletionStatusEnum {
    DELETED = 'DELETED',
    REJECTED = 'REJECTED',
    WAITING = 'WAITING',
    REQUESTED = 'REQUESTED',
    CANCELED = 'CANCELED',
}

export interface RequestAccountDeletionDataInterface {
    _id: string;
    user_id: string;
    status: RequestAccountDeletionStatusEnum;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    __v: number;
}
