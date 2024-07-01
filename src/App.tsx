import { dependencies, devDependencies, peerDependencies } from 'package.json';
import { NavBar } from './components/NavBar';
import { useState } from 'react';
import { Customizer } from './components/Customizer';
import { Settings } from './components/Settings';

export const colors = {
  'bg-primary': 'bg-gray-700',
  'bg-secondary': 'bg-purple-400',
  'text-primary': 'text-gray-700',
  'text-secondary': 'text-purple-400',
  'text-white': 'text-gray-200'
}

export enum Pages {
  Customizer,
  Settings
}

export const App = () => {
  const [page, setPage] = useState(Pages.Settings);

  return (<main className={`h-screen w-screen ${colors['bg-primary']}`}>
    <NavBar page={page} setPage={setPage}/>
    {page == Pages.Customizer && <Customizer/>}
    {page == Pages.Settings && <Settings/>}
  </main>);
}