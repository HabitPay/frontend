export interface ChallengeParticipationRecords {
  successDaysSet: Set<string>;
  failureDaysSet: Set<string>;
  upcomingDaysSet: Set<string>;
}

export interface ChallengeParticipationDto {
  successDayList: string[];
  failureDayList: string[];
  upcomingDayList: string[];
}
