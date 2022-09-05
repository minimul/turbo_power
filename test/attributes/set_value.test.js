import { html, fixture, assert, nextFrame } from '@open-wc/testing'
import sinon from 'sinon'

import { executeStream } from '../test_helpers'

import * as Turbo from "@hotwired/turbo"

import TurboPower from '../../'
TurboPower.initialize(Turbo.StreamActions)

describe('set_value', () => {
  context('target', () => {
    it('should set value', async () => {
      await fixture(`<input id="input" />`)

      assert.equal(document.querySelector("#input").value, "")

      await executeStream('<turbo-stream action="set_value" value="my-value" target="input"></turbo-stream>')

      assert.equal(document.querySelector("#input").value, "my-value")
    })

    it('should set attribute with empty value', async () => {
      await fixture(`<input id="input" value="previous-value" />`)

      assert.equal(document.querySelector("#input").value, "previous-value")

      await executeStream('<turbo-stream action="set_value" value="" target="input"></turbo-stream>')

      assert.equal(document.querySelector("#input").value, "")
    })

    it('should override previous value with empty value', async () => {
      await fixture(`<input id="input" value="previous-value" />`)

      assert.equal(document.querySelector("#input").value, "previous-value")

      await executeStream('<turbo-stream action="set_value" value="" target="input"></turbo-stream>')

      assert.equal(document.querySelector("#input").value, "")
    })

    it('should override previous value with missing "value" attribute', async () => {
      await fixture(html`<input id="input" value="previous-value" />`)

      assert.equal(document.querySelector("#input").value, "previous-value")

      await executeStream('<turbo-stream action="set_value" target="input"></turbo-stream>')

      assert.equal(document.querySelector("#input").value, "")
    })
  })

  context('targets', () => {
    it('should set value', async () => {
      await fixture(html`
        <input id="input1" />
        <input id="input2" />
        <input id="input3" />
      `)

      assert.equal(document.querySelector("#input1").value, "")
      assert.equal(document.querySelector("#input2").value, "")
      assert.equal(document.querySelector("#input3").value, "")

      await executeStream('<turbo-stream action="set_value" value="my-value" targets="input"></turbo-stream>')

      assert.equal(document.querySelector("#input1").value, "my-value")
      assert.equal(document.querySelector("#input2").value, "my-value")
      assert.equal(document.querySelector("#input3").value, "my-value")
    })

    it('should set attribute with empty value', async () => {
      await fixture(html`
        <input id="input1" value="previous-value" />
        <input id="input2" value="previous-value" />
        <input id="input3" value="previous-value" />
      `)

      assert.equal(document.querySelector("#input1").value, "previous-value")
      assert.equal(document.querySelector("#input2").value, "previous-value")
      assert.equal(document.querySelector("#input3").value, "previous-value")

      await executeStream('<turbo-stream action="set_value" value="" targets="input"></turbo-stream>')

      assert.equal(document.querySelector("#input1").value, "")
      assert.equal(document.querySelector("#input2").value, "")
      assert.equal(document.querySelector("#input3").value, "")
    })

    it('should override previous value with empty value', async () => {
      await fixture(html`
        <input id="input1" value="previous-value" />
        <input id="input2" value="previous-value" />
        <input id="input3" value="previous-value" />
      `)

      assert.equal(document.querySelector("#input1").value, "previous-value")
      assert.equal(document.querySelector("#input2").value, "previous-value")
      assert.equal(document.querySelector("#input3").value, "previous-value")

      await executeStream('<turbo-stream action="set_value" value="" targets="input"></turbo-stream>')

      assert.equal(document.querySelector("#input1").value, "")
      assert.equal(document.querySelector("#input2").value, "")
      assert.equal(document.querySelector("#input3").value, "")
    })

    it('should override previous value with missing "value" attribute', async () => {
      await fixture(html`
        <input id="input1" value="previous-value" />
        <input id="input2" value="previous-value" />
        <input id="input3" value="previous-value" />
      `)

      assert.equal(document.querySelector("#input1").value, "previous-value")
      assert.equal(document.querySelector("#input2").value, "previous-value")
      assert.equal(document.querySelector("#input3").value, "previous-value")

      await executeStream('<turbo-stream action="set_value" targets="input"></turbo-stream>')

      assert.equal(document.querySelector("#input1").value, "")
      assert.equal(document.querySelector("#input2").value, "")
      assert.equal(document.querySelector("#input3").value, "")
    })
  })
})