/*!
 *
 * Copyright 2016 - yangjunbao
 *
 * @author yangjunbao yangjunbao@same.com
 * @since 2016-11-16 18:35:38
 * @version 1.0.0
 * @desc LazyLoad.d.ts
 */

import * as React from 'react'

export interface LazyLoadProps {
  offset?: number;
  offsetVertical?: number;
  offsetHorizontal?: number;
  offsetTop?: number;
  offsetBottom?: number;
  offsetLeft?: number;
  offsetRight?: number;
  throttle?: number;
  debounce?: boolean;
  height?: number|string;
  width?: number|string;
  elementType?: string;
  threshold?: number;
  onContentVisible?: () => void;
}

export default class LazyLoad extends React.Component<LazyLoadProps, void> {
  constructor(props: any);
  componentDidMount(): void;
  componentWillReceiveProps(): void;
  shouldComponentUpdate(nextProps: LazyLoadProps, nextState: any): boolean;
  componentWillUnmount(): void;
  getEventNode(): HTMLElement;
  getOffset(): {left:number, right: number, top: number, bottom: number};
  lazyLoadHandler(): void;
  detachListeners(): void;
  render(): JSX.Element;
}

