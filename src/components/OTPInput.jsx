import { useState, useRef } from "react";

/**
 * OTPInput
 *
 * Props:
 *  - length    {number}   Number of OTP digits (default 4)
 *  - onChange  {function} Called with the full OTP string on every keystroke
 *  - onComplete {function} Called with the full OTP string when all digits are filled
 */
export default function OTPInput({ length = 4, onChange, onComplete }) {
  const [digits, setDigits] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    // Only allow single numeric character
    if (value.length > 1 || (value && !/^\d$/.test(value))) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    const combined = newDigits.join("");
    onChange?.(combined);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (combined.length === length && !newDigits.includes("")) {
      onComplete?.(combined);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        // Clear current
        const newDigits = [...digits];
        newDigits[index] = "";
        setDigits(newDigits);
        onChange?.(newDigits.join(""));
      } else if (index > 0) {
        // Move to previous
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    const newDigits = Array(length).fill("");
    pasted.split("").forEach((char, i) => {
      newDigits[i] = char;
    });
    setDigits(newDigits);
    onChange?.(newDigits.join(""));
    // Focus last filled input or the one after
    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
    if (newDigits.join("").length === length) {
      onComplete?.(newDigits.join(""));
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          className="w-14 h-14 sm:w-16 sm:h-16 text-center bg-[#f1f5fb] text-xl sm:text-2xl font-semibold border-1 border-[#191b1f] rounded-[8px] focus:outline-none focus:border-blue-900 transition-colors"
        />
      ))}
    </div>
  );
}
