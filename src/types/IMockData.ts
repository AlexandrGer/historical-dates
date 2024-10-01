export interface IMockData {
  id: number;
  title: string;
  events: IEvent[];
}

export interface IEvent {
  id: number;
  year: number;
  fact: string;
}
