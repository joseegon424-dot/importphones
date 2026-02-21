declare module '@barba/core' {
  interface BarbaOptions {
    transitions?: Array<{
      name?: string;
      leave?: (data: { current: { container: HTMLElement } }) => Promise<void> | void;
      enter?: (data: { next: { container: HTMLElement } }) => Promise<void> | void;
    }>;
    views?: Array<{
      namespace: string;
      beforeEnter?: () => void;
      afterEnter?: () => void;
    }>;
  }

  function init(options?: BarbaOptions): void;
  function destroy(): void;
}
