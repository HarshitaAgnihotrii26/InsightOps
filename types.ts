
export enum AuthMode {
  MOBILE_ENTRY = 'MOBILE_ENTRY',
  VERIFY_OTP = 'VERIFY_OTP',
  COMPLETE_PROFILE = 'COMPLETE_PROFILE',
  HOME = 'HOME'
}

export enum AppView {
  HOME = 'HOME',
  MAP = 'MAP',
  BUY = 'BUY',
  SELL = 'SELL',
  PROFILE = 'PROFILE',
  EDIT_PROFILE = 'EDIT_PROFILE',
  HISTORY = 'HISTORY',
  SAVED = 'SAVED',
  LICENSE = 'LICENSE',
  LEGAL = 'LEGAL',
  MESSAGES = 'MESSAGES',
  NOTIFICATIONS = 'NOTIFICATIONS',
  SETTINGS = 'SETTINGS',
  SUPPORT = 'SUPPORT',
  ABOUT = 'ABOUT'
}

export type Language = 'en' | 'hi';

export interface User {
  name: string;
  email: string;
  phone: string;
  role: 'Vendor' | 'User';
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface LandListing {
  id: string;
  title: string;
  price: number;
  area: string;
  location: string;
  city: string;
  type: 'Sell' | 'Rent';
  image: string;
}
