const DateFormatter = (date) => {
    try {
      const d = new Date(date);
      const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
      const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
      return `${da}-${mo}-${ye}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return ""; // Return an empty string or a fallback value in case of error
    }
  };
  
  export default DateFormatter;