export interface SelectedFilters {
    yearMonth: string;
    trainLine: string;
    time: string;
    dayType: string;
  }
  
export interface StationData {
    YEAR_MONTH: string;
    DAY_TYPE: string;
    TIME_PER_HOUR: string;
    PT_TYPE: string;
    PT_CODE: string;
    TOTAL_TAP_IN_VOLUME: string;
    TOTAL_TAP_OUT_VOLUME: string;
  }
  
export interface CachedResult {
    [key: string]: StationData[];
  }