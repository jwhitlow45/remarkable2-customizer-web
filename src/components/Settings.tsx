import { colors, NotificationContext } from "@/App";
import { useContext, useState } from "react";

export const ipv4_addr_key = "ipv4_addr";
export const root_password_key = "root_password";

export const Settings = () => {
  const SettingsHeaderClassName = "flex justify-center text-lg";
  const SettingsInputWrapperClassName = "flex justify-center my-3";
  const SettingsInputClassName = "p-1 rounded-lg text-black text-center focus:ring-0 focus:outline-none focus:border-purple-400 border-2 border-solid";
  const SaveButtonClassName = `flex mx-auto text-white ${colors['bg-secondary']} hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-lg text-sm px-4 py-1 mb-2`
  const InfoClassName = "text-center py-1"

  const [ipv4_addr, set_ipv4_addr] = useState(localStorage.getItem(ipv4_addr_key) ?? "");
  const [root_password, set_root_password] = useState(localStorage.getItem(root_password_key) ?? "");
  const createNotification = useContext(NotificationContext);

  function saveCredentials() {
    localStorage.setItem(ipv4_addr_key, ipv4_addr);
    localStorage.setItem(root_password_key, root_password);
    createNotification("Saved credentials!");
  }

  return (
    <div id="settings-container" className={`w-screen py-5 ${colors['text-white']} transition-full`}>
      <div className={SettingsHeaderClassName}>Credentials</div>
      <div className={SettingsInputWrapperClassName}>
        <input id="ipv4-addr-input" defaultValue={ipv4_addr} onChange={(e) => {set_ipv4_addr(e.target.value)}} className={SettingsInputClassName} placeholder="Local IPv4"/>
      </div>
      <div className={SettingsInputWrapperClassName}>
        <input id="root-password-input" defaultValue={root_password}onChange={(e) => {set_root_password(e.target.value)}} className={SettingsInputClassName} placeholder="Root password"/>
      </div>
      <button type="button" className={SaveButtonClassName} onClick={saveCredentials}>Save</button>
      <p className={InfoClassName}>
        The above information can be found on your Remarkable2 at <strong>Settings &gt; About &gt; Copyrights and licenses &gt; GPLv3 Compliance</strong> towards the bottom of the page.
      </p>
      <p className={InfoClassName}>
        Credentials are only every stored locally and never leave your machine.
      </p>
    </div>
  );
}