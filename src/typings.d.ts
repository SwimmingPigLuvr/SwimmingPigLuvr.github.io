declare module "*.svelte" {
    export default class { }
  }
  
declare module "$env/static/public" {
    export const OPENAI_KEY: string;
}