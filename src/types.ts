/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MenuCategoryType = "breakfast" | "lunch" | "dinner" | "drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategoryType;
  image: string;
  tags?: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  role?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  category: "ambiance" | "plating" | "culinary";
}

export interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}
