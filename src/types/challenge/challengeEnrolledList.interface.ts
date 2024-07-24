import { IChallengeEnrolledListItemDto } from ".";

export interface IChallengeEnrolledList {
  inProgress: IChallengeEnrolledListItemDto[];
  scheduled: IChallengeEnrolledListItemDto[];
  completed: IChallengeEnrolledListItemDto[];
}
