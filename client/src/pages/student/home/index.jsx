import { courseCategories } from "@/config";
import banner from "../../../../public/banner-img.png";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const totalCourses = studentViewCoursesList?.length || 0;

  function handleNavigateToCoursesPage(getCurrentId) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate("/courses");
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="px-4 lg:px-8 pt-8 pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-2 items-center px-6 py-12 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-white/80">
                Learn smarter, faster
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Learning that gets you ahead
              </h1>
              <p className="text-lg text-white/90">
                Build real skills for your present and your future. Start
                learning with guided paths and modern courses.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => navigate("/courses")}
                  className="bg-white text-slate-900 hover:bg-slate-100"
                >
                  Explore Courses
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleNavigateToCoursesPage("web-development")}
                  className="border-white/60 text-white hover:bg-white/10"
                >
                  Browse Categories
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-white/90">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{totalCourses}</span>
                  <span>Courses available</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">24/7</span>
                  <span>Learning access</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">1k+</span>
                  <span>Active learners</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <motion.img
                src={banner}
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl shadow-2xl ring-1 ring-white/20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Course Categories
          </h2>
          <Button variant="outline" onClick={() => navigate("/courses")}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {courseCategories.map((categoryItem) => (
            <motion.div
              key={categoryItem.id}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <Button
                className="w-full justify-start rounded-full bg-white shadow-sm border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                variant="outline"
                onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
              >
                {categoryItem.label}
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Featured Courses
            </h2>
            <p className="text-slate-600">
              Handpicked courses to accelerate your learning
            </p>
          </div>
          <Button onClick={() => navigate("/courses")}>See All</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <motion.div
                key={courseItem?._id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={courseItem?.image}
                    width={300}
                    height={180}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-slate-900">
                    {courseItem?.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {courseItem?.instructorName}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900">
                      ${courseItem?.pricing}
                    </p>
                    <span className="text-xs font-semibold text-indigo-600">
                      Explore
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
              No courses found
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
