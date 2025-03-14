// Base interfaces
export interface MCPRequest {
  jsonrpc: '2.0';
  id: string | number;
  method: string;
  params?: any;
}

// Generate interfaces
export interface GenerateRequest extends MCPRequest {
  method: 'generate';
  params: {
    prompt: string;
    temperature?: number;
    maxTokens?: number;
    stopSequences?: string[];
  };
}

export interface GenerateResponse extends MCPResponse {
  result: {
    content: string;
    type?: string;
    metadata?: any;
  };
}

// Stream interfaces
export interface StreamRequest extends MCPRequest {
  method: 'stream';
  params: {
    prompt: string;
    temperature?: number;
    maxTokens?: number;
    stopSequences?: string[];
  };
}

export interface StreamResponse extends MCPResponse {
  result: {
    type: 'stream';
    content: string;
    done: boolean;
  };
}

// Cancel and configure interfaces
export interface CancelRequest extends MCPRequest {
  method: 'cancel';
  params: {
    id?: string | number;
    requestId?: string | number;
  };
}

export interface ConfigureRequest extends MCPRequest {
  method: 'configure';
  params: {
    apiKey?: string;
    model?: string;
    options?: any;
    configuration?: any;
  };
}

// Server interfaces
export interface ServerCapabilities {
  supportedMethods: string[];
  streamingSupport: boolean;
  multimodalSupport: boolean;
  modelInfo: {
    name: string;
    version: string;
    contextWindow: number;
  };
}

export interface ServerInfo {
  name: string;
  version: string;
  protocolVersion: string;
}

export interface InitializeResult {
  capabilities: ServerCapabilities;
  serverInfo: ServerInfo;
  protocolVersion: string;
}

// Connection State
export interface ConnectionState {
  initialized: boolean;
  activeRequests: Set<string | number>;
  ip?: string;
  connectedAt: Date;
  lastMessageAt: Date;
}

export interface MCPResponse {
  jsonrpc: '2.0';
  id: string | number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export interface ProgressParams {
  progressToken: string | number;
  progress: number;
  total?: number;
}

export interface NotificationMessage {
  jsonrpc: '2.0';
  method: string;
  params?: any;
}

export interface ErrorNotification extends NotificationMessage {
  method: 'notifications/error';
  params: {
    code: number;
    message: string;
    data?: any;
  };
}

export interface ProgressNotification extends NotificationMessage {
  method: 'notifications/progress';
  params: ProgressParams;
}

export interface ShutdownRequest extends MCPRequest {
  method: 'shutdown';
}

export interface ExitNotification extends NotificationMessage {
  method: 'exit';
}
