import { useState } from "react";

const TeachersTable = () => {
  const initialTeachers = [
    {
      name: "John Mwansa",
      nrc: "123456/11/1",
      tsNo: "TS00123",
      school: "Kyawama Secondary",
      position: "Subject Teacher",
      subject: "Mathematics",
      experience: "5 yrs",
    },
    {
      name: "Mary Banda",
      nrc: "987654/22/2",
      tsNo: "TS00456",
      school: "Mwinilunga High",
      position: "Head Teacher",
      subject: "English",
      experience: "12 yrs",
    },
    {
      name: "James Phiri",
      nrc: "456789/33/3",
      tsNo: "TS00789",
      school: "Solwezi High",
      position: "Deputy Teacher",
      subject: "Science",
      experience: "8 yrs",
    },
    {
      name: "Lucy Chanda",
      nrc: "654321/44/4",
      tsNo: "TS00999",
      school: "Kasama Girls",
      position: "Senior Teacher",
      subject: "Biology",
      experience: "10 yrs",
    },
  ];

  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter((teacher) =>
    Object.values(teacher)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      {/* Top Section: Add Button + Search */}
      <div className="flex justify-between items-center mb-4">
        <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-blue-700">
          + Add Teacher
        </button>
        <input
          type="text"
          placeholder="Search teachers..."
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">NRC No.</th>
            <th className="px-6 py-3">TS No.</th>
            <th className="px-6 py-3">Current School</th>
            <th className="px-6 py-3">Position</th>
            <th className="px-6 py-3">Subject</th>
            <th className="px-6 py-3">Experience</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTeachers.map((teacher, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {teacher.name}
              </td>
              <td className="px-6 py-4">{teacher.nrc}</td>
              <td className="px-6 py-4">{teacher.tsNo}</td>
              <td className="px-6 py-4">{teacher.school}</td>
              <td className="px-6 py-4">{teacher.position}</td>
              <td className="px-6 py-4">{teacher.subject}</td>
              <td className="px-6 py-4">{teacher.experience}</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeachersTable;
