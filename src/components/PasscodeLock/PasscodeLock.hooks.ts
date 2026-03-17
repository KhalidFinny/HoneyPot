import { useState, useEffect } from "react";

interface UsePasscodeLockProps {
  correctPin: string;
  onUnlock: () => void;
}

export function usePasscodeLock({ correctPin, onUnlock }: UsePasscodeLockProps) {
  const [pin, setPin] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      setPin([...pin, num]);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === 4) {
      const enteredPin = pin.join("");
      if (enteredPin === correctPin) {
        onUnlock();
      } else {
        setError(true);
        setTimeout(() => {
          setPin([]);
          setError(false);
        }, 600);
      }
    }
  }, [pin, correctPin, onUnlock]);

  const triggerBiometrics = async () => {
    try {
      if (window.PublicKeyCredential) {
        alert("Biometrics placeholder. Please use PIN.");
        // Removed simulation trigger

      }
    } catch (err) {
      console.error("Biometrics failed", err);
    }
  };

  return {
    pin,
    error,
    handleKeyPress,
    handleDelete,
    triggerBiometrics,
  };
}
