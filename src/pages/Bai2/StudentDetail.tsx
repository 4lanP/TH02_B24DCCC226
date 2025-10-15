import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await axios.get<Student>(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setStudent(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <p>Đang tải chi tiết...</p>;
  if (!student) return <p>Không tìm thấy sinh viên.</p>;

  const { name, email, phone, website } = student;

  return (
    <div>
      <h2>Chi tiết sinh viên</h2>
      <p><strong>Tên:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Điện thoại:</strong> {phone}</p>
      <p><strong>Website:</strong> {website}</p>
      <Link to="/bai2">Quay lại danh sách</Link>
    </div>
  );
}
