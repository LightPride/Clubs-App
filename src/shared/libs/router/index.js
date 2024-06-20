import { toast } from '../../../components/AlertToast';

class Router {
  #routes = [];
  #notFoundRoute = null;

  register(path, callback) {
    if (path === 'not-found') {
      this.#notFoundRoute = { path, callback };
    } else {
      this.#routes.push({ path, callback });
    }
  }

  init(parentNode) {
    window.addEventListener('hashchange', () => this.#route(parentNode));
    this.#route(parentNode).catch(error => {
      toast.showError(`Error: ${error.message}`);
    });
    return parentNode;
  }

  async #route(parentNode) {
    const hash = window.location.hash.slice(1);
    const parts = hash.split('/');

    for (const route of this.#routes) {
      const match = this.#matchRoute(parts, route);
      if (match) {
        const content = await route.callback(...match.params);
        parentNode.html(content);
        return;
      }
    }

    if (this.#notFoundRoute) {
      const notFoundContent = this.#notFoundRoute.callback();
      parentNode.html(notFoundContent);
    }
  }

  #matchRoute(parts, route) {
    const routeParts = route.path.split('/');

    if (routeParts.length !== parts.length) {
      return null;
    }

    const params = [];
    for (const [index, part] of parts.entries()) {
      if (routeParts[index].startsWith(':')) {
        params.push(part);
      } else if (routeParts[index] !== part) {
        return null;
      }
    }
    return { params };
  }
}

export const router = new Router();
