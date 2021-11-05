FROM node:lts

COPY . .

ENV NODE_ENV development
ENV PORT 5000
ENV DATABASE_URL 'postgres://hemfjdfanpeodc:6fb291bee502258e3f6c6de3bdb50cb5a0bfd20fa3105a5db0ba3bf8fc717278@ec2-3-221-140-141.compute-1.amazonaws.com:5432/d12c4kmseto7p3'

CMD ["npm", "run", "dev"]

