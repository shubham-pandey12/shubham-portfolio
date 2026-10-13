import profileData from "./profile.json";
export const profile = profileData.profile;
export const companies = profileData.companies;

export function yearsOfExperience(now = new Date()) {
  const earliestStart = companies
    .map(({ date }) => new Date(`${date.split(" – ")[0]} 1`))
    .filter((date) => !Number.isNaN(date.getTime()))
    .reduce<Date | undefined>(
      (earliest, date) => (!earliest || date < earliest ? date : earliest),
      undefined,
    );

  return earliestStart
    ? Math.max(
        0,
        now.getFullYear() -
          earliestStart.getFullYear() -
          (now.getMonth() < earliestStart.getMonth() ? 1 : 0),
      )
    : 0;
}
