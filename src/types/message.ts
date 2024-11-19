type NotificationReason = 
  | "like" 
  | "repost" 
  | "follow" 
  | "mention" 
  | "reply" 
  | "quote" 
  | "starterpack-joined";

interface NotificationAuthor {
  // Define properties for the author object here based on its structure
  id: string; 
  displayName: string;
  avatar: string;
  handle: string;
}

interface NotificationLabel {
  // Define properties for the label object here if needed
  type: string;
  value: string;
}

export interface NotificationType {
  uri: string; // at-uri required
  cid: string; // cid required
  author: NotificationAuthor; // required
  reason: NotificationReason; // required
  reasonSubject?: string; // at-uri (optional)
  record: Record<string, unknown>; // required, generic object
  isRead: boolean; // required
  indexedAt: string; // date-time required
  labels?: NotificationLabel[]; // optional array of objects
}