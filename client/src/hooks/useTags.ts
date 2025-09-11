import { generalTags } from "../components/Tags/GeneralTag";
import { useAgeGroups } from "../queries/ageGroups";
import { useTaskTypes } from "../queries/taskTypes";
import { UserRole } from "../types";

export const useTags = ({ closable }: { closable?: boolean }) => {
    // const { roles, ageGroups, taskTypes } = useSelector((state: AppStore) => state.tags);
    const { data: ageGroups, isLoading: ageGroupIsloading } = useAgeGroups();
    const { data: taskTypes, isLoading: tasktypesIsLoading } = useTaskTypes();

    return {
        roleTags: generalTags(
            Object.keys(UserRole).map((role) => ({ id: role, label: role, closable: closable }))
        ),
        ageGroupTags: generalTags(
            ageGroups?.map((item) => ({
                id: item.id,
                label: `${item.from} - ${item.to}`,
                closable: closable,
            })) || []
        ),
        taskTypeTags: generalTags(
            taskTypes?.map((type) => ({ id: type.id, label: type.name, closable: closable })) || []
        ),
    };
};
