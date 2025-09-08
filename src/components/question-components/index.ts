import { type FC } from 'react';

import QuestionInputConf, { type QuestionInputPropsType } from './question-input';
import QuestionTitleConf, { type QuesitonTitlePropsType } from './question-title';
import QuestionParagraphConf, { type QuestionParagraphPropsType } from './question-paragraph';
import QuestionInfoConf, { type QuestionInfoPropsType } from './question-info';
import QuestionTextareaConf, { type QuestionTextareaPropsType } from './question-textarea';
import QuestionRadioConf, {
  type QuestionRadioPropsType,
  type QuestionRadioStatPropsType,
} from './question-radio';
import QuestionCheckboxConf, {
  type QuestionCheckboxPropsType,
  type QuestionCheckboxStatPropsType,
} from './question-checkbox';

// 组件的PropsType
export type ComponentPropsType = QuesitonTitlePropsType &
  QuestionInputPropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

// 各个组件的统计属性类型
type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType;

// 组件的配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  StatComponent?: FC<ComponentStatPropsType>;
};

const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
];

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
