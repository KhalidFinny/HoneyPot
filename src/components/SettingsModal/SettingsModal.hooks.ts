import { useState, useEffect } from "react";
import { db } from "../../data/db";
import { useLiveQuery } from "dexie-react-hooks";

interface UseSettingsModalProps {
  onClose: () => void;
}

export function useSettingsModal({ onClose }: UseSettingsModalProps) {
  const [lang, setLang] = useState("en");
  const [curr, setCurr] = useState("USD");
  const [passcode, setPasscode] = useState("");
  const [isPinEnabled, setIsPinEnabled] = useState(false);
  const [theme, setTheme] = useState("light");
  const [payday, setPayday] = useState("");





  const languageSetting = useLiveQuery(() => db.table("settings").get("language"));
  const currencySetting = useLiveQuery(() => db.table("settings").get("currency"));
  const passcodeSetting = useLiveQuery(() => db.table("settings").get("passcode"));
  const themeSetting = useLiveQuery(() => db.table("settings").get("theme"));
  const paydaySetting = useLiveQuery(() => db.table("settings").get("payday"));





  useEffect(() => {
    if (languageSetting?.value) setLang(languageSetting.value);
  }, [languageSetting]);

  useEffect(() => {
    if (currencySetting?.value) setCurr(currencySetting.value);
  }, [currencySetting]);

  useEffect(() => {
    if (passcodeSetting?.value) {
      setIsPinEnabled(true);
      setPasscode(passcodeSetting.value);
    } else {
      setIsPinEnabled(false);
      setPasscode("");
    }
  }, [passcodeSetting]);

  useEffect(() => {
    if (themeSetting?.value) setTheme(themeSetting.value);
  }, [themeSetting]);

  useEffect(() => {
    if (paydaySetting?.value) setPayday(String(paydaySetting.value));
  }, [paydaySetting]);




  const handleSave = async () => {
    await db.table("settings").put({ key: "language", value: lang });
    await db.table("settings").put({ key: "currency", value: curr });
    await db.table("settings").put({ key: "theme", value: theme });
    if (payday) {
      await db.table("settings").put({ key: "payday", value: parseInt(payday) });
    } else {
      await db.table("settings").delete("payday");
    }




    if (isPinEnabled && passcode.length === 4) {
      await db.table("settings").put({ key: "passcode", value: passcode });
    } else if (!isPinEnabled) {
      await db.table("settings").delete("passcode");
    }
    onClose();
  };

  const handleReset = async () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      await db.table("expenses").clear();
      await db.table("settings").clear();
      window.location.reload();
    }
  };

  return {
    lang,
    setLang,
    curr,
    setCurr,
    passcode,
    setPasscode,
    isPinEnabled,
    setIsPinEnabled,
    theme,
    setTheme,
    payday,
    setPayday,
    handleSave,


    handleReset,
  };
}
