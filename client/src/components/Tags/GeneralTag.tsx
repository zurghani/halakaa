import { Tag } from "antd";
import type { TagProps } from "antd/lib/tag";

interface GeneralTagProps extends Omit<TagProps, "id"> {
    id: number | string;
    label: string;
    onClick?: () => void;
}
const colorsArray = [
    "blue",
    "green",
    "red",
    "magenta",
    "gold",
    "orange",
    "geekblue",
    "lime",
    "volcano",
    "cyan",
    "purple",
];
type GeneralTagReturn = { [key: string]: React.ReactNode };

export const generalTags = (tags: GeneralTagProps[]): GeneralTagReturn => {
    const map: GeneralTagReturn = {};
    tags.map((tag, index) => {
        map[tag.id] = (
            <Tag
                key={tag.label}
                color={colorsArray[index % colorsArray.length] as TagProps["color"]}
                onClick={tag.onClick}
                style={{ cursor: tag.onClick ? "pointer" : "default" }}
                closable={tag.closable}>
                {tag.label}
            </Tag>
        );
    });
    return map;
};
