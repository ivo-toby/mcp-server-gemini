export * from './completion.js';
export * from './resources.js';
export * from './prompts.js';

export interface BaseProvider {
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  getCapabilities(): Record<string, any>;
}

export interface CompletionProvider extends BaseProvider {
  complete(argument: any): Promise<any>;
}

export interface ContentProvider extends BaseProvider {
  generateContent(prompt: string, options?: any): Promise<string>;
  streamContent?(prompt: string, options?: any): AsyncIterator<string>;
}