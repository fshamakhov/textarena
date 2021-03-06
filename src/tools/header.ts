import { ToolOptionsType } from '~/interfaces/ToolOptions';
import Toolbar from '~/Toolbar';
import * as utils from '../utils';

export default function header(toolbar: Toolbar, config: ToolOptionsType): void {
  const value = config.header as string;
  const focusElement = utils.getFocusElement();
  if (focusElement && focusElement.closest(value)) {
    document.execCommand('formatblock', false, 'P');
  } else {
    document.execCommand('formatblock', false, value);
  }
}
