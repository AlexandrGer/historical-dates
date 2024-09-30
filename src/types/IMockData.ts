export interface IMockData {
  id: number;
  title: string;
  events: IEvent[];
}

export interface IEvent {
  year: number;
  fact: string;
}
