import {
  useState,
  useEffect
} from "react";
import NepaliDate from "nepali-date";

const useDateTime = () => {
  const [dateTime,
    setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const nepaliDate = new NepaliDate();
      const formattedDate = nepaliDate.format("YYYY-MM-DD");
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
      setDateTime(`${formattedDate} ${formattedTime}`);
    };

    updateDateTime(); // Set initial value
    const intervalId = setInterval(updateDateTime, 60000); // Update every minute
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return dateTime;
};

export default useDateTime;