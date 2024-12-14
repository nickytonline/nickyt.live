export {};

type NetlifyLocals = import("@astrojs/netlify").NetlifyLocals;

declare namespace App {
  interface Locals extends NetlifyLocals {}
}

declare global {
  interface GlobalThis {
    matchMedia: (query: string) => { matches: boolean };
  }
}
