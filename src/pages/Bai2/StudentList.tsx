import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get<Student[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setStudents(data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách:", err);
        setError("Không thể tải danh sách sinh viên.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p>Đang tải danh sách sinh viên...</p>;
  if (error) return <p>Lỗi {error}</p>;

  return (
    <div>
      <h2>Danh sách sinh viên</h2>
      {students.length === 0 ? (
        <p>Không có sinh viên nào.</p>
      ) : (
        <ul>
          {students.map(({ id, name, email }) => (
            <li key={id}>
              <Link to={`/bai2/${id}`}>{name}</Link> - {email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
