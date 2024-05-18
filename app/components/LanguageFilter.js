import { useState, useEffect } from 'react';
import { languages } from '../data/data';

export default function LanguageFilter({ onFilter, initialValue }) {
  const [language, setLanguage] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setLanguage(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setLanguage(value);
    setSuggestions(value ? languages.filter(lang => lang.toLowerCase().startsWith(value.toLowerCase())) : []);
  };

  const handleFilter = () => {
    onFilter(language);
    setSuggestions([]);
  };

  const selectSuggestion = (suggestion) => {
    setLanguage(suggestion);
    setSuggestions([]);
    onFilter(suggestion);
  };

  return (
    <div className="my-4">
      <input
        type="text"
        value={language}
        onChange={handleChange}
        className="border p-2 mr-2"
        placeholder="Filter by language"
      />
      <button onClick={handleFilter} className="bg-green-500 text-white p-2">
        Apply Language Filter
      </button>
      <ul className="border border-gray-300 mt-2">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion}
            onClick={() => selectSuggestion(suggestion)}
            className="cursor-pointer p-2 hover:bg-gray-200"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
