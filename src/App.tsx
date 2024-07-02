import { dependencies, devDependencies, peerDependencies } from 'package.json';
import { NavBar } from './components/NavBar';
import React, { useState } from 'react';
import { Customizer } from './components/Customizer';
import { Settings } from './components/Settings';
import { Toast } from './components/Toast';

export const colors = {
  'bg-primary': 'bg-gray-700',
  'bg-secondary': 'bg-purple-400',
  'text-primary': 'text-gray-700',
  'text-secondary': 'text-purple-400',
  'text-white': 'text-gray-200',
  'fill-white': 'fill-gray-200'
}

export enum Pages {
  Customizer,
  Settings
}

export const NotificationContext = React.createContext((message: string, ttl: number = 5000) => { });

export const App = () => {
  const [page, setPage] = useState(Pages.Settings);
  const [notification_message, set_notification_message] = useState("");
  const [notification_hidden, set_notification_hidden] = useState(true);

  function createNotification(message: string, ttl: number = 5000) {
    set_notification_message(message);
    set_notification_hidden(false);
    setTimeout(() => {
      set_notification_hidden(true);
    }, ttl);
  }

  return (<main className={`h-screen w-screen ${colors['bg-primary']}`}>
    <NotificationContext.Provider value={createNotification}>
      <NavBar page={page} setPage={setPage} />
      {page == Pages.Customizer && <Customizer />}
      {page == Pages.Settings && <Settings />}
      <Toast message={notification_message} hidden={notification_hidden} />
    </NotificationContext.Provider>
  </main>);
}