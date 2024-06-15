import { Toast } from 'bootstrap';

export class AlertToast {
  constructor(message) {
    this.toastContainer = $(
      `<div class="toast-container position-fixed bottom-0 end-0 p-3"></div>`
    );
    this.toastMarkup = $(`
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="6000">
    <div class="toast-header">
      <strong class="me-auto">Alert</strong>
      <small>Now</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      ${message}
    </div>
  </div>`);
  }

  show() {
    $('#app').append(this.toastContainer.append(this.toastMarkup));
    const toastBootstrap = new Toast(this.toastMarkup);
    toastBootstrap.show();
  }
}
