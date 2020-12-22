declare module server {
	interface applicationTypeModel {
		submissionType: number;
		countryID: number;
		centerId: number;
		totalApplicant: number;
		durationOfVisit: number;
        isSponsor: string;
        applicationTypeID: number;
        purposeOfVisit: string;
	}
}