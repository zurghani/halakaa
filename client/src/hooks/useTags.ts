import { useSelector } from "react-redux";
import { AppStore } from "../store";
import { generalTags } from "../components/Tags/GeneralTag";

export const useTags = ({ closable }: { closable?: boolean }) => {
    const { roles, ageGroups, taskTypes } = useSelector((state: AppStore) => state.tags);

    return {
        roleTags: generalTags(roles.map((label) => ({ label: label, closable: closable }))),
        ageGroupTags: generalTags(ageGroups.map((label) => ({ label: label, closable: closable }))),
        taskTypeTags: generalTags(taskTypes.map((label) => ({ label: label, closable: closable }))),
    };
};
