import { DEPARTMENTS_OPTIONS, selectedDepartment } from "./signals";

export default function MapMenu() {
  return (
    <form className="max-w-sm mx-auto">
      <label
        htmlFor="departments"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select a department
      </label>
      <select
        id="departments"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Choose a department</option>
        {DEPARTMENTS_OPTIONS.map((option) => (
          <option
            onClick={() => {
              selectedDepartment.value = option;
            }}
            key={option.name}
            value={option.name}
          >
            {option.name}
          </option>
        ))}
      </select>
    </form>
  );
}
