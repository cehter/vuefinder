#!/usr/bin/env bash
# Builds the package, commits the built dist/, tags the commit with the
# version from package.json, and pushes both to origin.
#
# Usage: bump the "version" field in package.json, then run:
#   npm run release
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ -n "$(git status --porcelain -- ':!dist')" ]]; then
  echo "Error: working tree has uncommitted changes outside dist/. Commit or stash them first." >&2
  exit 1
fi

VERSION="$(node -p "require('./package.json').version")"
TAG="v${VERSION}"

if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "Error: tag $TAG already exists. Bump the version in package.json first." >&2
  exit 1
fi

echo "Building $TAG..."
npm run build

git add dist package.json

if git diff --cached --quiet; then
  echo "Error: build produced no changes to commit for $TAG." >&2
  exit 1
fi

git commit -m "build: $TAG"
git tag -a "$TAG" -m "$TAG"

echo "Pushing commit and tag..."
git push origin HEAD
git push origin "$TAG"

echo "Released $TAG."
