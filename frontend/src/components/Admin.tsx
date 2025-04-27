import { useEffect, useState } from "react";
import axios from "axios";
import { be_url } from "./Gate";
import { Route, Routes, useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

interface Course {
  id?: string;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
}

export default function Admin() {
  const [allMyCourses, setAllMyCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Course>({
    id:"",
    name: "",
    description: "",
    price: 0,
    imgUrl: "",
  });
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const myCourses = await axios.get(`${be_url}/admin/course`, {
          headers: {
            token,
          },
        });
        setAllMyCourses([...myCourses.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  const handleCreateOrUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCourseId) {
        // Update existing course
       try {
        console.log("This is what I am editing: ",newCourse)
         const response = await axios.put(
           `${be_url}/admin/course/`,
           newCourse,
           {
             headers: {
               token,
             },
           }
         );
         console.log(response.data);
         alert("Course updated successfully");
         setEditingCourseId(null);
       } catch (error) {
        console.log(error)
       }
      } else {
        // Create new course
       try{
        const response = await axios.post(
            `${be_url}/admin/course`,
            {...newCourse
            },
            {
              headers: {
                token,
              },
            }
          );
          console.log(response.data);
          alert("Course created successfully");
       }catch(error){
        console.log(error)
       }
      }
      // Refresh course list
      const myCourses = await axios.get(`${be_url}/admin/course`, {
        headers: { token },
      });
      setAllMyCourses([...myCourses.data]);
      setNewCourse({ name: "", description: "", price: 0, imgUrl: "" });
      navigate("/admin/mycourses");
    } catch (error) {
      console.log("Error creating/updating course:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleEditCourse = (course: Course) => {
    console.log(course)
    setNewCourse(course);
    setEditingCourseId(course.id!);
    navigate("/admin/createcourse");
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const response = await axios.delete(`${be_url}/admin/course/${courseId}`, {
        headers: {
          token,
        },
      });
      console.log(response.data);
      alert("Course deleted successfully");
      setAllMyCourses(allMyCourses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.log("Error deleting course:", error);
    }
  };

  return (
    <div className="bg-black">
      <Routes>
        {/* Create or Update Course Route */}
        <Route
          path="/createcourse"
          element={
            <div className="max-w-lg mx-auto py-10">
              <h2 className="text-3xl font-bold mb-8 text-white text-center">
               
                {editingCourseId ? "Update Course" : "Create a New Course"}
              </h2>
              <form className="mx-4" onSubmit={handleCreateOrUpdateCourse}>
                <div className="mb-4">
                  <label className="block text-white">Course Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newCourse.name}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white">Description</label>
                  <textarea
                    name="description"
                    value={newCourse.description}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={newCourse.price}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white">Image URL</label>
                  <input
                    type="text"
                    name="imgUrl"
                    value={newCourse.imgUrl}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-700 hover:bg-yellow-600 text-white py-2 rounded"
                >
                  {editingCourseId ? "Update Course" : "Create Course"}
                </button>
              </form>
            </div>
          }
        />

        {/* My Courses Route */}
        <Route
          path="/mycourses"
          element={
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-3xl font-bold mb-8 text-center text-white">
                My Courses
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {allMyCourses.map((course, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src={ "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwcBwJIzBAH2ifAbZAyqj6xutrEhhMngfp8w&s"}
                      alt={course.name}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {course.name}
                      </h2>
                      <p className="mt-2 text-gray-600 bg-yellow-200 overflow-clip">{course.description}</p>
                      <p className="mt-4 text-lg font-bold text-yellow-700">
                        ${course.price}
                      </p>
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        
                      >
                        Edit

                       
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id!)}
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/"
          element={
            <div>
              <button
                className="m-4 bg-yellow-700 py-2 hover:bg-yellow-600 px-1 text-black font-bold rounded-md"
                onClick={() => navigate("/admin/createcourse")}
              >
                Create Course
              </button>
              <button
                className="m-4 bg-yellow-700 py-2 hover:bg-yellow-600 px-1 text-black font-bold rounded-md"
                onClick={() => navigate("/admin/mycourses")}
              >
                View My Courses
              </button>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

