interface Props {
  date: string;
  setDate: (date: string) => void;
}

const DatePicker = ({ date, setDate }: Props) => {
  return (
    <div className="align gap-2">
      <p className="hidden md:block">Select a date:</p>
      <input
        className="border-gray-300 border-solid border rounded-md p-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min="2020-01-13"
        max="2021-03-07"
        type="date"
      />
    </div>
  );
};

export default DatePicker;
