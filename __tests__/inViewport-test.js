/* global jest, expect */

jest.unmock('../src/utils/inViewport');
import inViewport from '../src/utils/inViewport';

const customOffset = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

describe('inViewport', () => {
  it(`doesn't display image which sits right above container's viewport`, () => {
    const element = {
      top: 0,
      left: 0,
      offsetWidth: 10,
      offsetHeight: 10,
    };
    const container = {
      top: 11,
      left: 0,
      offsetWidth: 100,
      offsetHeight: 100,
    };
    expect(inViewport(element, container, { ...customOffset, bottom: 2 })).toEqual(false);
  });
  it(`doesn't display image which sits right bolow container's viewport`, () => {
    const element = {
      top: 101,
      left: 0,
      offsetWidth: 10,
      offsetHeight: 10,
    };
    const container = {
      top: 0,
      left: 0,
      offsetWidth: 100,
      offsetHeight: 100,
    };
    expect(inViewport(element, container, { ...customOffset, top: 2 })).toEqual(false);
  });
  it(`doesn't display image which sits immediately to the left of container's viewport`, () => {
    const element = {
      top: 0,
      left: 0,
      offsetWidth: 10,
      offsetHeight: 10,
    };
    const container = {
      top: 0,
      left: 11,
      offsetWidth: 100,
      offsetHeight: 100,
    };
    expect(inViewport(element, container, { ...customOffset, right: 2 })).toEqual(false);
  });
  it(`doesn't display image which sits immediately to the right of container's viewport`, () => {
    const element = {
      top: 0,
      left: 101,
      offsetWidth: 10,
      offsetHeight: 10,
    };
    const container = {
      top: 0,
      left: 0,
      offsetWidth: 100,
      offsetHeight: 100,
    };
    expect(inViewport(element, container, { ...customOffset, left: 2 })).toEqual(false);
  });
});
