import { ChangeEvent, useState } from "react";

import { SupportedLanguages } from "./types";

const options: Array<[string, SupportedLanguages]> = [
  ["English (US)", "en-US"],
  ["English (UK)", "en-GB"],
  ["French", "fr-FR"],
  ["French Canadian", "fr-CA"],
  ["Spanish", "es-ES"],
  ["Spanish (MX)", "es-MX"],
  ["German", "de-DE"],
];

export interface LanguageSelectorProps {
  onChange: (lang: SupportedLanguages) => void;
}
const LanguageSelector = ({ onChange }: LanguageSelectorProps) => {
  const [selectedValue, setSelectedValue] =
    useState<SupportedLanguages>("en-US");

  const selectChangedHanlder = (event: ChangeEvent<HTMLSelectElement>) => {
    const [option] = event.target.selectedOptions;
    setSelectedValue(option.value as SupportedLanguages);
    onChange(option.value as SupportedLanguages);
  };

  return (
    <select value={selectedValue} onChange={selectChangedHanlder}>
      {options.map(([text, lang]) => (
        <option key={lang} value={lang}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
