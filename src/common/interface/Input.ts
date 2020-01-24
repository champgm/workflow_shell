import _ from 'lodash';
import { Option } from './Option';
import { Argument } from './Argument';

export interface Input {
  defaultName?: string;
  defaultMessage?: string;
  defaultSearchString?: string;
  type?: string;
  [key: string]: any;
}
