export type QuesitonTitlePropsType = {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;
  disabled?: boolean

  onChange?: (newProps: QuesitonTitlePropsType) => void;
};

export const QuestionTitleDefaultProps: QuesitonTitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false,
};
