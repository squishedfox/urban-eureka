export interface JobHistoryListItem {
  /**
   * Full name of the company
   * @example "Hello World Inc."
   * @example "Major Busines LLC."
   */
  companyName: string;
  /**
   * Job title you held
   * @example "Super Executive of uselessness"
   */
  title: string;
  /**
   * Month and year started
   * @example "12/23/2021"
   */
  startDate: string;
  /**
   * end month and year
   * @example "12/23/2021"
   */
  endDate?: string;
  /**
   * List of exerpience you have in your job
   */
  experience: Record<string, string>;
}

export interface JobHistoryList {
  /**
   * All of your job history
   */
  items: JobHistoryListItem[];
}
