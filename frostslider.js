// frostSlider.js
// A minimal slider component that changes a numeric value between min and max with arrow keys.

class FrostSlider {
  /**
   * @param {HTMLElement} element - The container element where the slider will be active.
   * @param {number} min - Minimum slider value.
   * @param {number} max - Maximum slider value.
   * @param {number} step - Increment step.
   * @param {function} onChange - Callback on value change.
   */
  constructor(element, min = 0, max = 100, step = 1, onChange = null) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Valid HTMLElement required');
    }
    this.element = element;
    this.min = min;
    this.max = max;
    this.step = step;
    this.value = min;
    this.onChange = typeof onChange === 'function' ? onChange : () => {};
    this._bindEvents();
    this._render();
  }

  _bindEvents() {
    this.element.setAttribute('tabindex', '0');
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        this._changeValue(this.value + this.step);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        this._changeValue(this.value - this.step);
        e.preventDefault();
      }
    });
  }

  _changeValue(newValue) {
    const clamped = Math.min(this.max, Math.max(this.min, newValue));
    if (clamped !== this.value) {
      this.value = clamped;
      this._render();
      this.onChange(this.value);
    }
  }

  _render() {
    this.element.textContent = `Value: ${this.value}`;
  }
}

// Usage example:
// const slider = new FrostSlider(document.getElementById('slider'), 0, 50, 5, val => console.log('New value:', val));

export default FrostSlider;
