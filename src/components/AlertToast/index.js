import { Toast } from 'bootstrap';

export class AlertToast {
  toastContainer = $(
    `<div class="toast-container position-fixed top-0 end-0 p-3"></div>`
  );

  show(message, status) {
    const templateMarkup = this.#render(message, status);
    this.toastContainer.append(templateMarkup);
    const toastBootstrap = new Toast(templateMarkup);
    toastBootstrap.show();
  }

  showSuccess(message) {
    this.show(message, 'bg-success');
  }

  showError(message) {
    this.show(message, 'bg-danger');
  }

  #render(message, status = 'bg-light') {
    return $(`
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="6000">
    <div class="toast-header ${status}">
      <strong class="me-auto">Alert</strong>
      <small>Now</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      ${message}
    </div>
  </div>`);
  }
}

export const toast = new AlertToast();
