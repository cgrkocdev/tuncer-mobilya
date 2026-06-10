/**
 * Server-side API logic entry point.
 * Route handlers in /app/api should delegate business logic here.
 */

export async function healthCheck() {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
}
