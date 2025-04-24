export interface IGooglePromptNotification {
    isNotDisplayed: () => boolean;
    isSkipped: () => boolean;
    getNotDisplayedReason: () => string;
    getSkippedReason: () => string;
    isDismissed: () => boolean;
    getDismissedReason: () => string;
  }