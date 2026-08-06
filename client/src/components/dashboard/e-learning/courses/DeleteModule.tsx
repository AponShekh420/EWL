import { Button } from "@/components/ui/button"
import { addCourseField } from "@/redux/features/course/courseFormSlice";
import { RootState } from "@/redux/store";
import { BASE_URL } from "@/utils/envVariable";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { Icon } from "@iconify/react";
import { useState } from "react";


interface initialCoursesProps {
  _id?: string;
  id: string;
  name: string;
  price?: number;
}


const DeleteModule = ({course}: {course: initialCoursesProps}) => {
    const dispatch = useDispatch();
    const {modules} = useSelector((state: RootState) => state.courseForm);
    const [loading, setLoading] = useState(false);

    const handleDelete = async (course: initialCoursesProps) => {
        setLoading(true);
        try {
        const response = await fetch(`${BASE_URL}/api/e-learning/courses/modules/delete`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies for authentication
            body: JSON.stringify({ id: course.id }), // Send the course ID in the request body
        });

        if (!response.ok) {
            throw new Error("Failed to delete module");
        }

        const result = await response.json();
        // console.log("Module deleted:", result);
        toast.success("Module deleted successfully");
        dispatch(addCourseField({
            modules: modules.filter(module => module.id !== course.id) // Remove the deleted course from the modules array
        }));
        } catch (error) {
        console.error("Error deleting module:", error);
        } finally {
        setLoading(false);
        }
    }
    return (
        <Button
            type="button"
            className={`bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center justify-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
            onClick={() => handleDelete(course)}
            >
            {!loading ? <Icon icon="material-symbols:delete-outline" width="20" height="20" />  : <Icon icon="eos-icons:loading" width="20" height="20" />}
            Delete
        </Button>
    );
}

export default DeleteModule;