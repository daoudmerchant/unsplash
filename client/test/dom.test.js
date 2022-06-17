const { JSDOM } = require('jsdom');
const { basicDom } = require('../src/dom');

test('Fills the dom with basic elements', () => {
  const dom = new JSDOM(basicDom);

  const headerClass = dom.window.document.querySelector('header').className;
  expect(headerClass).toBe('header');
  const form = dom.window.document.querySelector('form');
  expect(form).not.toBeFalsy();
  const nav = dom.window.document.querySelector('nav').textContent;
  expect(nav).toBe('LOGO');
  const input = dom.window.document.querySelector('input');
  expect(input).not.toBeFalsy();
  const footer = dom.window.document.querySelector('footer');
  expect(footer).not.toBeFalsy();
  const photoBox = dom.window.document.querySelector('#photoBox');
  expect(photoBox).not.toBeFalsy();
});
