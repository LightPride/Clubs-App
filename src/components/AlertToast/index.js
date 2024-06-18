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

  #render(message, status) {
    let background;
    switch (status) {
      case 'success':
        background = 'bg-success';
        break;
      case 'warning':
        background = 'bg-danger';
        break;

      default:
        break;
    }
    return $(`
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="6000">
    <div class="toast-header ${background}">
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
