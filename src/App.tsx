import { dependencies, devDependencies, peerDependencies } from 'package.json';
import { NavBar } from './components/NavBar';
import { useState } from 'react';

export const colors = {
  'primary': 'bg-purple-700',
  'secondary': 'bg-purple-400'
}

export enum Pages {
  Customizer,
  Settings
}

export const App = () => {
  const [page, setPage] = useState(Pages.Customizer);

  return (<main className="bg-gray-700 h-screen w-screen">
    <NavBar page={page} setPage={setPage}/>
  </main>);
}