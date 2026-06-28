/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Person {
  id: string;
  isSelf: boolean;
  name: string;
  nickname?: string;
  relationshipType:
    | "Friend"
    | "Family"
    | "Colleague"
    | "Client"
    | "Mentor"
    | "Student"
    | "Other";
  dob: string; // YYYY-MM-DD
  birthTime?: string; // Time string or Shi Chen value
  timeAccuracy: "Exact" | "ShiChen" | "Unknown";
  photo?: string; // raw avatar data URL or placeholder reference
  createdAt: Date;
  updatedAt: Date;
}
