const error = (method: any) =>
    new Error(`Method ${method}() must be implemented by subclass.`);

export class LoggerAdapter {
    info(message: any, optionals?: any) {
        throw error('info');
    };

    error(message: any, optionals?: any) {
        throw error('error');
    };

    warn(message: any, optionals?: any) {
        throw error('warn');
    };

    verbose(message: any, optionals?: any) {
        throw error('verbose');
    };

    debug(message: any, optionals?: any) {
        throw error('debug');
    };

    silly(message: any, optionals?: any) {
        throw error('trace');
    };

    fatal(message: any, optionals?: any) {
        throw error('fatal');
    };
}