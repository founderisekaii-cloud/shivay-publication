export type SecurityRuleContext = {
    path: string;
    operation: 'get' | 'list' | 'create' | 'update' | 'delete';
    requestResourceData?: any;
  };
  
  export class FirestorePermissionError extends Error {
    public readonly context: SecurityRuleContext;
  
    constructor(context: SecurityRuleContext) {
      const message = `FirestorePermissionError: Insufficient permissions for ${context.operation} on ${context.path}`;
      super(message);
      this.name = 'FirestorePermissionError';
      this.context = context;
  
      Object.setPrototypeOf(this, FirestorePermissionError.prototype);
    }
  }
  