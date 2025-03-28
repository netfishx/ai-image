FROM oven/bun:slim AS base

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=bun.lock,target=bun.lock \
    --mount=type=bind,source=patches/next@15.3.0-canary.24.patch,target=patches/next@15.3.0-canary.24.patch \
    --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

COPY .env.local .env

RUN bun run build

FROM base AS runner

RUN addgroup --system --gid 1002 nodejs
RUN adduser --system --uid 1002 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["bun", "server.js"]
