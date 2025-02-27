import { MMKV } from 'react-native-mmkv'
import { navigationRef } from '../navigation/rootNavigation';
import { CommonActions } from '@react-navigation/native';

export const storage = new MMKV()

export function navigate(name: string, params?: Record<string, any>): void {
    if (navigationRef?.isReady()) {
      navigationRef?.navigate(name, params);
    }
  }

  export function navigateBack(): void {
    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  }
  
  export function resetNavigation(name: string) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name }],
        })
      );
    }
  }
  export function formatDate(inputDate: string): string {
    if (!inputDate) return '';
  
    const dateObj = new Date(inputDate);
  
    if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
    // Extracting date components
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateObj.getDate()).padStart(2, '0');
  
    // Extracting time components
    let hour = dateObj.getHours();
    const minute = String(dateObj.getMinutes()).padStart(2, '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';
  
    // Convert hour to 12-hour format
    hour = hour % 12 || 12;
  
    return `${String(hour).padStart(2, '0')}:${minute} ${ampm} ${year}/${month}/${day}`;
  }
  export function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  