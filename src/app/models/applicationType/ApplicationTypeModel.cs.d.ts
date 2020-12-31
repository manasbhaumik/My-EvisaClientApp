export interface ApplicationTypeModel {
	ApplicationID: number;
	ApplicationTypeID: number;
	SubmissionType: number;
	CenterID: number;
	ContactID: number;
	TotalApplicant: number;
	PurposeOfVisit: string;
	DurationOfVisit: number;
	VisaTypeID: number;
	SubmitedBy: string;
	SubmissionDate: Date;
	AcceptedBy: string;
	Status: string;
	UpdatedDate: Date;
	UpdatedBy: number;
	CountryID: any;
	// Applicants: Applicant[];
	// ApplicationType: ApplicationType;
	// Center: Center;
	// Contact: Contact3;
	// Payments: Payment[];
	// Sponsors: Sponsor4[];
}