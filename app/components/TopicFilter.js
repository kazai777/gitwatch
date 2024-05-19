import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
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
    <div className="relative w-full max-w-[340px] mx-2">
      <Input
        label="Search"
        isClearable
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        value={topic}
        onChange={handleChange}
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border text-black border-gray-300 rounded-lg mt-2 w-full">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => selectSuggestion(suggestion)}
              className="cursor-pointer p-2 rounded-lg hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
