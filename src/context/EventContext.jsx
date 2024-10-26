import { createContext, useContext, useState, useEffect } from "react";
import { events as initialEvents } from "../data";

const EventContext = createContext();

// eslint-disable-next-line react/prop-types
export const EventProvider = ({ children }) => {
  const [events] = useState(initialEvents); // This will hold all event data
  const [filteredEvents, setFilteredEvents] = useState([]); // This will hold the filtered events
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Most Recent");
  const [filters, setFilters] = useState({
    date: "",
    status: "",
    name: "",
  });

  useEffect(() => {
    const applyFiltersAndSorting = () => {
      let filtered = [...events]; // Create a copy of events array

      // Search filtering
      if (searchTerm) {
        filtered = filtered.filter((event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Other filtering
      if (filters.date) {
        filtered = filtered.filter((event) => event.date === filters.date);
      }
      if (filters.status) {
        filtered = filtered.filter((event) => event.status === filters.status);
      }
      if (filters.name) {
        filtered = filtered.filter((event) =>
          event.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }

      // Sorting
      filtered.sort((a, b) =>
        sortOption === "Most Recent"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      );

      setFilteredEvents(filtered);
    };

    applyFiltersAndSorting();
  }, [events, searchTerm, sortOption, filters]);

  const exportEvents = () => {
    const csvData = filteredEvents.map((event) => ({
      Name: event.name,
      Speaker: event.speaker,
      Date: event.date,
      Status: event.status,
    }));

    const csvString = [
      Object.keys(csvData[0]).join(","), // header row
      ...csvData.map((row) => Object.values(row).join(",")), // data rows
    ].join("\n");

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Create a link and download the CSV file
    const a = document.createElement("a");
    a.href = url;
    a.download = "events.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <EventContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        sortOption,
        setSortOption,
        filters,
        setFilters,
        filteredEvents,
        exportEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
