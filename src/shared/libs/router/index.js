class Router {
  constructor() {
    this.routes = [];
    this.notFoundRoute = null;
  }

  init(parentNode) {
    window.addEventListener('hashchange', () => this.route(parentNode));
    this.route(parentNode);
    return parentNode;
  }

  async route(parentNode) {
    const hash = window.location.hash.slice(1);
    const parts = hash.split('/');

    for (const route of this.routes) {
      const match = this.matchRoute(parts, route);
      if (match) {
        const content = await route.callback(...match.params);
        parentNode.html(content);
        return;
      }
    }

    if (this.notFoundRoute) {
      const content = await this.notFoundRoute.callback();
      parentNode.html(content);
    }
  }

  matchRoute(parts, route) {
    const routeParts = route.path.split('/');

    if (routeParts.length !== parts.length) {
      return null;
    }

    const params = [];
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params.push(parts[i]);
      } else if (routeParts[i] !== parts[i]) {
        return null;
      }
    }
    return { params };
  }

  register(path, callback) {
    if (path === 'not-found') {
      this.notFoundRoute = { path, callback };
    } else {
      this.routes.push({ path, callback });
    }
  }
}

export const router = new Router();
