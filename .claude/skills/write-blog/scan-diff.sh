#!/usr/bin/env bash
# Security gate for the write-blog skill: blocks pushing a blog branch to the
# public repo if the diff contains unexpected files or anything secret-shaped.
# Usage: scan-diff.sh [base-ref]   (default base: origin/trunk)
set -uo pipefail

base="${1:-origin/trunk}"
fail=0

if ! git rev-parse --verify --quiet "$base" >/dev/null; then
  echo "FAIL: base ref '$base' not found — run 'git fetch origin trunk' first."
  exit 1
fi

# 1. Path allowlist: a blog branch may only add/change blog MDX, blog images,
#    docs, and this skill itself.
while IFS= read -r f; do
  case "$f" in
    data/blog/*.mdx | public/static/images/* | docs/* | .claude/skills/write-blog/*) ;;
    *)
      echo "FAIL: unexpected file in diff: $f"
      fail=1
      ;;
  esac
done < <(git diff --name-only "$base"...HEAD)

# 2. Secret patterns in added lines only.
patterns=(
  'AKIA[0-9A-Z]{16}'                                  # AWS access key id
  'gh[pousr]_[A-Za-z0-9]{20,}'                        # GitHub tokens
  'github_pat_[A-Za-z0-9_]{20,}'                      # GitHub fine-grained PAT
  'sk-[A-Za-z0-9_-]{20,}'                             # OpenAI / Anthropic style keys
  'xox[baprs]-[A-Za-z0-9-]{10,}'                      # Slack tokens
  'AIza[0-9A-Za-z_-]{35}'                             # Google API key
  '-----BEGIN [A-Z ]*PRIVATE KEY'                     # private key blocks
  'eyJ[A-Za-z0-9_-]{20,}\.eyJ'                        # JWT
  '(postgres(ql)?|mysql|mongodb(\+srv)?|redis|amqp)://[^/[:space:]]*:[^@[:space:]]+@'  # creds in connection strings
  '(api[_-]?key|secret|token|password|passwd|private[_-]?key)["'"'"']?[[:space:]]*[=:][[:space:]]*["'"'"'][^"'"'"'[:space:]]{8,}'  # assignments
)

added_lines=$(git diff "$base"...HEAD | grep -E '^\+' | grep -vE '^\+\+\+' || true)
for p in "${patterns[@]}"; do
  hits=$(printf '%s\n' "$added_lines" | grep -niE -e "$p" || true)
  if [ -n "$hits" ]; then
    echo "FAIL: secret-shaped content matches /$p/:"
    printf '%s\n' "$hits" | head -5
    fail=1
  fi
done

# 3. gitleaks, when installed, as a second opinion.
if command -v gitleaks >/dev/null 2>&1; then
  if ! gitleaks detect --source . --log-opts="$base..HEAD" --no-banner --redact; then
    echo "FAIL: gitleaks reported findings."
    fail=1
  fi
else
  echo "note: gitleaks not installed; pattern scan only (install: https://github.com/gitleaks/gitleaks)"
fi

if [ "$fail" -ne 0 ]; then
  echo "RESULT: FAIL — do NOT push this branch."
  exit 1
fi
echo "RESULT: PASS — diff limited to expected paths, no secret-shaped content found."
