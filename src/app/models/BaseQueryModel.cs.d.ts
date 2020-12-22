declare module server {
	interface baseQueryModel {
		pageSize: number;
		pageIndex: number;
		sortColumn: string;
		sortDescending: boolean;
	}
}