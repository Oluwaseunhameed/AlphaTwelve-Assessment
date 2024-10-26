import styled from "styled-components";
import { FiSearch, FiChevronDown, FiDownload } from "react-icons/fi";
import { useDarkMode } from "../context/DarkModeContext";
import { useEventContext } from "../context/EventContext";

const ToolbarContainer = styled.div`
  font-size: 1.4rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-grey-00);
  padding: 1rem 1rem 1rem 0;
  border-radius: 0.5rem;
  color: var(--color-grey-700);
  gap: 1rem;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE */
  scrollbar-width: none; /* Firefox */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const ResultTextDiv = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SortDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: 10rem;
  }
`;

const OptionsDiv = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-grey-0);
  padding: 0.8rem;
  border: ${({ isActive }) =>
    isActive ? "none" : ".1rem solid var(--color-grey-100)"};
  border-radius: 0.4rem;

  input {
    border: none;
    outline: none;
    background: transparent;
    color: var(--color-grey-700);
    margin-left: 0.8rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Dropdown = styled.select`
  appearance: none;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  padding: 0.8rem 2.5rem 0.8rem 0.8rem;
  border: ${({ isActive }) =>
    isActive ? "none" : ".1rem solid var(--color-grey-100)"};
  border-radius: 0.4rem;
  font-size: 1.4rem;
  width: 100%;
  text-align-last: center;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ChevronIcon = styled(FiChevronDown)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-grey-700);

  @media (max-width: 768px) {
    right: 39%;
  }
`;

const ResultText = styled.span`
  margin-left: 1.6rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const MoreOptions = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 0.4rem;
  padding: 0.2rem 0.8rem;
  margin-left: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ isActive }) =>
    isActive ? "none" : ".1rem solid var(--color-grey-100)"};

  &::before {
    content: "⋮";
    font-size: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const ExportButton = styled.button`
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  padding: 1rem 0.8rem;
  border: ${({ isActive }) =>
    isActive ? "none" : ".1rem solid var(--color-grey-100)"};
  border-radius: 0.8rem;
  margin-left: 1.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Toolbar = () => {
  const { isDarkMode } = useDarkMode();
  const {
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    filters,
    setFilters,
    filteredEvents,
    exportEvents,
  } = useEventContext();

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleFilterChange = (field, value) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  // Helper functions to get unique values for filters
  const getUniqueStatusOptions = () => {
    const uniqueStatuses = new Set(filteredEvents.map((event) => event.status));
    return Array.from(uniqueStatuses).map((status) => (
      <option key={status} value={status}>
        {status}
      </option>
    ));
  };

  const getUniqueNames = () => {
    const uniqueNames = new Set(filteredEvents.map((event) => event.name));
    return Array.from(uniqueNames).map((name) => (
      <option key={name} value={name}>
        {name}
      </option>
    ));
  };

  // Sample implementation for Date filtering - Adjust as per your requirements
  const getDateOptions = () => {
    // This assumes the events have a date property.
    const uniqueDates = new Set(filteredEvents.map((event) => event.date));
    return Array.from(uniqueDates).map((date) => (
      <option key={date} value={date}>
        {new Date(date).toLocaleDateString()}
      </option>
    ));
  };

  const isMobile = window.innerWidth < 768;

  return (
    <ToolbarContainer>
      <FlexDiv>
        <SearchContainer isActive={isDarkMode}>
          <FiSearch />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </SearchContainer>
        <DropdownWrapper>
          <Dropdown
            isActive={isDarkMode}
            value={filters.date}
            onChange={(e) => handleFilterChange("date", e.target.value)}
          >
            <option value="">Date</option>
            {getDateOptions()}
          </Dropdown>
          <ChevronIcon />
        </DropdownWrapper>

        <DropdownWrapper>
          <Dropdown
            isActive={isDarkMode}
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">Status</option>
            {getUniqueStatusOptions()}
          </Dropdown>
          <ChevronIcon />
        </DropdownWrapper>

        <DropdownWrapper style={{ width: isMobile ? "100%" : "9rem" }} >
          <Dropdown
            isActive={isDarkMode}
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
          >
            <option value="">Name</option>
            {getUniqueNames()}
          </Dropdown>
          <ChevronIcon />
        </DropdownWrapper>
      </FlexDiv>

      <ResultTextDiv>
        <ResultText>Displaying {filteredEvents.length} results</ResultText>
      </ResultTextDiv>

      <SortDiv>
        <span>Sort:</span>
        <DropdownWrapper>
          <Dropdown
            isActive={isDarkMode}
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="Most Recent">Most Recent</option>
            <option value="Least Recent">Least Recent</option>
          </Dropdown>
          <ChevronIcon />
        </DropdownWrapper>
      </SortDiv>

      <OptionsDiv>
        <MoreOptions isActive={isDarkMode} />
        <ExportButton isActive={isDarkMode} onClick={exportEvents}>
          <FiDownload style={{ marginRight: "8px" }} />
          Export
        </ExportButton>
      </OptionsDiv>
    </ToolbarContainer>
  );
};

export default Toolbar;
