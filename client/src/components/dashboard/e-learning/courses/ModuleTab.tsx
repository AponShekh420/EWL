import { addCourseField } from "@/redux/features/course/courseFormSlice";
import ModuleSelectionTable from "./ModuleSelectionTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import InputBox from "@/components/common/InputBox";

const ModuleTab = () => {
  const courseForm = useSelector((state: RootState) => state.courseForm);
    const dispatch = useDispatch();
    return (
        <>
            {
                courseForm.installmentMonths != "" && courseForm.installmentMonths != "0" && (
                    <div>
                        <p className="text-red-500 mb-6 capitalize">
                            the module system won&apos;t be available for courses that have installment plans, so if you want to use the module system, make sure to set installment months to 0 or leave it blank.
                        </p>
                    </div>
                )
            }
            <div className={`w-full max-w-5xl p-4 bg-white rounded-lg border shadow-sm ${courseForm.installmentMonths != "" && courseForm.installmentMonths != "0" ? "pointer-events-none opacity-50" : ""}`}>
                <InputBox
                    type="number"
                    name="Module"
                    label="Three Module Price"
                    placeholder="0"
                    disabled={(courseForm.installmentMonths == "" || courseForm.installmentMonths == "0") ? false : true}
                    icon="$"
                    value={courseForm.module}
                    onChange={(e) =>
                        dispatch(addCourseField({ module: e.target.value, installmentMonths: 0 }))
                    }
                />
                <ModuleSelectionTable />
            </div>
        </>
    );
}

export default ModuleTab;