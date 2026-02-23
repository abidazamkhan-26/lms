import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  createDemoOrderService,
  fetchStudentViewCourseDetailsService,
} from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function StudentViewCourseDetailsPage() {
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const { auth } = useContext(AuthContext);

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  async function fetchStudentViewCourseDetails() {
    if (!currentCourseDetailsId) return;
    setLoadingState(true);

    const checkCoursePurchaseInfoResponse = auth?.user?._id
      ? await checkCoursePurchaseInfoService(
          currentCourseDetailsId,
          auth?.user?._id
        )
      : null;

    if (
      checkCoursePurchaseInfoResponse?.success &&
      checkCoursePurchaseInfoResponse?.data
    ) {
      setLoadingState(false);
      navigate(`/course-progress/${currentCourseDetailsId}`);
      return;
    }

    const response = await fetchStudentViewCourseDetailsService(
      currentCourseDetailsId
    );

    if (response?.success) {
      setStudentViewCourseDetails(response?.data);
      setLoadingState(false);
    } else {
      setStudentViewCourseDetails(null);
      setLoadingState(false);
    }
  }

  function handleSetFreePreview(getCurrentVideoInfo) {
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  }

  async function handleDemoPurchase() {
    if (!auth?.user?._id || !studentViewCourseDetails?._id) return;
    const orderPayload = {
      userId: auth?.user?._id,
      userName: auth?.user?.userName,
      userEmail: auth?.user?.userEmail,
      instructorId: studentViewCourseDetails?.instructorId,
      instructorName: studentViewCourseDetails?.instructorName,
      courseImage: studentViewCourseDetails?.image,
      courseTitle: studentViewCourseDetails?.title,
      courseId: studentViewCourseDetails?._id,
      coursePricing: studentViewCourseDetails?.pricing,
    };

    const response = await createDemoOrderService(orderPayload);

    if (response.success) {
      navigate(`/course-progress/${studentViewCourseDetails?._id}`);
    }
  }

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
  }, [displayCurrentVideoFreePreview]);

  useEffect(() => {
    if (id) {
      setCurrentCourseDetailsId(id);
      setLoadingState(true);
    }
  }, [id]);

  useEffect(() => {
    if (currentCourseDetailsId !== null) fetchStudentViewCourseDetails();
  }, [currentCourseDetailsId, auth]);

  useEffect(() => {
    if (!location.pathname.includes("course/details"))
      setStudentViewCourseDetails(null),
        setCurrentCourseDetailsId(null);
  }, [location.pathname]);

  if (loadingState) return <Skeleton />;

  if (!studentViewCourseDetails) {
    return (
      <div className="mx-auto p-6 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Course details not found</h1>
        <Button onClick={() => navigate("/courses")}>
          Back to Courses
        </Button>
      </div>
    );
  }

  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails?.curriculum?.findIndex((item) => item.freePreview) ??
    -1;
  const previewUrl =
    getIndexOfFreePreviewUrl !== -1
      ? studentViewCourseDetails?.curriculum?.[getIndexOfFreePreviewUrl]
          ?.videoUrl
      : "";
  const hasFreePreview = Boolean(previewUrl);
  const courseStudentsCount = studentViewCourseDetails?.students?.length || 0;
  const createdOnDate = studentViewCourseDetails?.date
    ? new Date(studentViewCourseDetails.date).toLocaleDateString()
    : "";
  const objectivesList = studentViewCourseDetails?.objectives
    ? studentViewCourseDetails.objectives.split(",")
    : [];

  return (
    <div className="mx-auto p-4 md:p-8">
      <div className="relative overflow-hidden rounded-2xl bg-gray-900 text-white">
        <img
          src={studentViewCourseDetails?.image}
          alt={studentViewCourseDetails?.title}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-200">
            {studentViewCourseDetails?.category ? (
              <span className="rounded-full bg-white/10 px-3 py-1">
                {studentViewCourseDetails.category}
              </span>
            ) : null}
            {studentViewCourseDetails?.level ? (
              <span className="rounded-full bg-white/10 px-3 py-1">
                {studentViewCourseDetails.level}
              </span>
            ) : null}
            {studentViewCourseDetails?.primaryLanguage ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                <Globe className="h-4 w-4" />
                {studentViewCourseDetails.primaryLanguage}
              </span>
            ) : null}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            {studentViewCourseDetails?.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-3">
            {studentViewCourseDetails?.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-200">
            <span>Created By {studentViewCourseDetails?.instructorName}</span>
            {createdOnDate ? <span>Created On {createdOnDate}</span> : null}
            <span>
              {courseStudentsCount}{" "}
              {courseStudentsCount <= 1 ? "Student" : "Students"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8 border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>What you&apos;ll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {objectivesList.map((objective, index) => (
                  <li
                    key={`${objective}-${index}`}
                    className="flex items-start gap-2 rounded-lg border border-gray-100 p-3"
                  >
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-8 border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              {studentViewCourseDetails?.description}
            </CardContent>
          </Card>
          <Card className="mb-8 border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {studentViewCourseDetails?.curriculum?.map(
                  (curriculumItem, index) => (
                    <li
                      key={`${curriculumItem?.title}-${index}`}
                      className={`flex items-start gap-3 rounded-lg border p-3 ${
                        curriculumItem?.freePreview
                          ? "cursor-pointer hover:border-gray-400"
                          : "cursor-not-allowed opacity-70"
                      }`}
                      onClick={
                        curriculumItem?.freePreview
                          ? () => handleSetFreePreview(curriculumItem)
                          : null
                      }
                    >
                      <div className="mt-0.5">
                        {curriculumItem?.freePreview ? (
                          <PlayCircle className="h-4 w-4" />
                        ) : (
                          <Lock className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {index + 1}. {curriculumItem?.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {curriculumItem?.freePreview
                            ? "Free preview available"
                            : "Locked"}
                        </span>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>
        </main>
        <aside className="w-full lg:w-[420px]">
          <Card className="sticky top-6 border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                {hasFreePreview ? (
                  <VideoPlayer url={previewUrl} width="450px" height="200px" />
                ) : (
                  <img
                    src={studentViewCourseDetails?.image}
                    alt={studentViewCourseDetails?.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex items-end justify-between mb-4">
                <span className="text-3xl font-bold">
                  ${studentViewCourseDetails?.pricing}
                </span>
                {hasFreePreview ? (
                  <span className="text-sm text-gray-600">
                    Free preview available
                  </span>
                ) : null}
              </div>
              <Button onClick={handleDemoPurchase} className="w-full">
                Buy Now (Demo)
              </Button>
              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <p>Full lifetime access</p>
                <p>Certificate of completion</p>
                <p>Access on mobile and desktop</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayCurrentVideoFreePreview(null);
        }}
      >
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Course Preview</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg flex items-center justify-center">
            <VideoPlayer
              url={displayCurrentVideoFreePreview}
              width="450px"
              height="200px"
            />
          </div>
          <div className="flex flex-col gap-2">
            {studentViewCourseDetails?.curriculum
              ?.filter((item) => item.freePreview)
              .map((filteredItem) => (
                <p
                  key={filteredItem?.public_id || filteredItem?.title}
                  onClick={() => handleSetFreePreview(filteredItem)}
                  className="cursor-pointer text-[16px] font-medium"
                >
                  {filteredItem?.title}
                </p>
              ))}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseDetailsPage;
