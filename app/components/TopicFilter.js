import { useState, useEffect } from 'react';
import { themes } from '../data/data';

export default function TopicFilter({ onFilter, initialValue }) {
  const [topic, setTopic] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setTopic(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setTopic(value);
    setSuggestions(value ? themes.filter(top => top.toLowerCase().startsWith(value.toLowerCase())) : []);
  };

  const handleFilter = () => {
    onFilter(topic);
    setSuggestions([]);
  };

  const selectSuggestion = (suggestion) => {
    setTopic(suggestion);
    setSuggestions([]);
    onFilter(suggestion);
  };

  return (
    <div className="my-4">
      <input
        type="text"
        value={topic}
        onChange={handleChange}
        className="border p-2 mr-2"
        placeholder="Filter by topic"
      />
      <button onClick={handleFilter} className="bg-green-500 text-white p-2">
        Apply Topic Filter
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
