import { Application } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';

Application.run({ moduleName: 'app-root' });

// Initialize notifications
LocalNotifications.hasPermission();