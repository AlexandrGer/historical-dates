import {
  useState,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { IMockData } from "../types/IMockData";
import { mockData } from "../utils/MockData";

type dataContext = {
  data: IMockData[];
  setData: Dispatch<SetStateAction<IMockData[]>>;
  currentEvents: number;
  setCurrentEvents: Dispatch<SetStateAction<number>>;
};

type Props = {
  children: ReactNode;
};

const DataContext = createContext<dataContext | undefined>(undefined);

export function DataProvider({ children }: Props) {
  const [data, setData] = useState<IMockData[]>(mockData);
  const [currentEvents, setCurrentEvents] = useState<number>(0);
  return (
    <DataContext.Provider
      value={{ data, setData, currentEvents, setCurrentEvents }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = (): dataContext => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return context;
};
