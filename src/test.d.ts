export interface GetDebugDataRequest {
    test: string;
}
export interface GetDebugDataReply {
    val?: string
}
export declare class DebugGrpcService {
    getDebugData(req: GetDebugDataRequest): Promise<GetDebugDataReply>
}