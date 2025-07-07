import { User } from "./user";

export interface MatchDisplay {
  date: string;
  time: string;
  court: string;
  matchType: string;
  score?: string;
  result?: 'W' | 'L';
  myTeam: string;
  expanded: boolean;
  opponent?: string;
  players?: User[];
}