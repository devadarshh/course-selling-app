import { useEffect, useState } from "react";
import axios from "axios";
import { be_url } from "./Gate";
const token = localStorage.getItem("token");

interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
}

export default function User() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [allMyCourses, setAllMyCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseRes = await axios.get(`${be_url}/courses`, {
          headers: {
            token,
          },
        });
        const myCourses = await axios.get(`${be_url}/user/courses`,{       headers: {
          token,
        },})
        console.log("all courses: ",courseRes);
        setAllCourses([...courseRes.data]);
        console.log("my courses:",myCourses)
        setAllMyCourses([...myCourses.data.courses])

      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  const handlePurchase = async (course: Course) => {
    try {
      const res = await axios.post(
        `${be_url}/courses/purchase`, 
        { courseId: course.id }, 
        {
          headers: {
            token,
          },
        }
      );
      console.log(
        `Course purchased: ${course.name}`,
        "purcahse details: ",
        res
      );
      alert(`You have successfully purchased ${course.name}`);
    } catch (error) {
      console.error(error);
      alert("Error occurred during the purchase.");
    }
  };
  const [activeTab, setActiveTab] = useState<"available" | "purchased">(
    "available"
  );
  return (
    <div className="bg-black ">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          {activeTab === "available" ? "Available Courses" : "My Courses"}
        </h1>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("available")}
            className={`px-4 py-2 text-white rounded ${
              activeTab === "available"
                ? "bg-yellow-700"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            Available Courses
          </button>
          <button
            onClick={() => setActiveTab("purchased")}
            className={`px-4 py-2 text-white rounded ${
              activeTab === "purchased"
                ? "bg-yellow-700"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            My Courses
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {(activeTab==="available"?allCourses:allMyCourses).map((course, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200"
            >
              <img
                src="https://i.pinimg.com/736x/35/02/f3/3502f37264f3dbffd2849eb7e89706b3.jpg"
                alt={course.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {course.name}
                </h2>
                <p className="mt-2 text-gray-600 overflow-clip">{course.description}</p>
                <p className="mt-4 text-lg font-bold text-yellow-700">
                  ${course.price}
                </p>
                <button
                  onClick={() => handlePurchase(course)}
                  className="mt-4 bg-yellow-700 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors duration-200"
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
