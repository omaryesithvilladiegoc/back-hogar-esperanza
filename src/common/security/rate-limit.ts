import { Request } from 'express';

type RateLimitOptions = {
  key: string;
  windowMs: number;
  maxAttempts: number;
  blockDurationMs?: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
  blockedUntil?: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const pruneExpiredEntries = (now: number) => {
  for (const [key, entry] of rateLimitStore.entries()) {
    const isExpired = entry.resetAt <= now && (!entry.blockedUntil || entry.blockedUntil <= now);
    if (isExpired) {
      rateLimitStore.delete(key);
    }
  }
};

export const getClientIp = (request: Request) => {
  const forwardedFor = request.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',')[0].trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return forwardedFor[0];
  }

  return request.ip || request.socket.remoteAddress || 'unknown';
};

export const checkRateLimit = ({
  key,
  windowMs,
  maxAttempts,
  blockDurationMs = windowMs,
}: RateLimitOptions) => {
  const now = Date.now();
  pruneExpiredEntries(now);

  const currentEntry = rateLimitStore.get(key);

  if (currentEntry?.blockedUntil && currentEntry.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterMs: currentEntry.blockedUntil - now,
    };
  }

  if (!currentEntry || currentEntry.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      retryAfterMs: 0,
    };
  }

  currentEntry.count += 1;

  if (currentEntry.count > maxAttempts) {
    currentEntry.blockedUntil = now + blockDurationMs;
    rateLimitStore.set(key, currentEntry);

    return {
      allowed: false,
      retryAfterMs: currentEntry.blockedUntil - now,
    };
  }

  rateLimitStore.set(key, currentEntry);

  return {
    allowed: true,
    retryAfterMs: 0,
  };
};
