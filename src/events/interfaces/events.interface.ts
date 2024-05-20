export interface ServerToClientEvents {
  taskCreated?: (payload: any) => void;
  taskUpdated?: (payload: any) => void;
  taskDeleted?: (payload: any) => void;
}
