<<<<<<< HEAD
// User
export type User = {
  id: number;
}

// Profile
export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
};

// Meeting
export type Meeting = {
  id: string;
  title: string;
  note?: string;
  date: string; // ISO date string
  creator_id: string;
  created_at: string;
};

// Invite / Time Selection
export type MeetingInvite = {
  id: string;
  meeting_id: string;
  invitee_id: string;
  status: 'pending' | 'accepted' | 'declined';
};

export type TimeResponse = {
  id: string;
  meeting_id: string;
  invitee_id: string;
  time_range: string;
  is_available: boolean;
};

// Message (Contact Us)
export type ContactMessage = {
  id: string;
  full_name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
};

//Notification
export type Notification = {
  id: string;
  user_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
};
=======
export interface User {
    id: number;
    // name: string;
  }
>>>>>>> parent of fc25579 (Update types.ts)
