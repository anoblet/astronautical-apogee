import { unsafeCSS } from 'lit';
import global from './global.css?inline';
import utility from './utility.css?inline';

export const globalStyles = unsafeCSS(global + utility);
