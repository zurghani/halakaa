import { Tag } from "antd";
import type { TagProps } from "antd/lib/tag";

interface GeneralTagProps {
    label: string;
    onClick?: () => void;
}
const colorsArray = [
    "blue",
    "volcano",
    "green",
    "orange",
    "gold",
    "lime",
    "red",
    "cyan",
    "magenta",
    "geekblue",
    "purple",
];
type GeneralTagReturn = { [key: string]: React.ReactNode };

export const generalTags = (tags: GeneralTagProps[]): GeneralTagReturn => {
    const map: GeneralTagReturn = {};
    tags.map((tag, index) => {
        map[tag.label] = (
            <Tag
                key={tag.label}
                color={colorsArray[index % colorsArray.length] as TagProps["color"]}
                onClick={tag.onClick}
                style={{ cursor: tag.onClick ? "pointer" : "default" }}>
                {tag.label}
            </Tag>
        );
    });
    return map;
};
