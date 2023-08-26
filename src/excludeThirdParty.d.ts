// to make typescript ignore svg files while importing
declare module '*.svg' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any;
    export default content;
}
declare module 'ui-components';

