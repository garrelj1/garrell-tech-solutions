# Design: `write-blog` skill

**Date:** 2026-07-03
**Status:** Approved

A project skill that drafts blog posts for this site on a fresh branch, grounds every
factual claim in fetched sources, and opens a PR for human review before anything merges.

## Invocation

- `/write-blog tech <topic>` — a post about a technology Jeremy uses and how it benefited him
- `/write-blog update <repo> <what to share>` — a project update sourced from a (possibly private) GitHub repo

## Workflow

1. **Preflight** — verify `gh auth status` succeeds and the working tree is clean.
   Stop with a clear message if either fails.
2. **Brief** — collect a per-run brief from Jeremy:
   - Tech posts: his actual experience (benefits, metrics, anecdotes). First-person
     content only ever comes from the brief — never invented.
   - Project updates: which repo, and exactly what is OK to disclose.
3. **Branch** — `git checkout -b blog/<slug>` from `trunk`.
4. **Research → evidence file** — every fetch (docs, release notes, news, `gh` reads)
   is logged to a scratchpad evidence file: URL + the exact excerpts relied on.
   The evidence file is the only permitted basis for factual claims.
5. **Draft** — MDX at `data/blog/<slug>.mdx` matching existing frontmatter conventions
   (`title`, `date`, `tags`, `draft`, `summary`). Inline links for each claim plus a
   Sources section at the end. `draft: false` — the PR is the review gate.
6. **Claims audit** — a fresh subagent (no drafting context) extracts every factual
   claim and verifies it against the evidence file. Unsupported claims are rewritten
   or cut, and the audit is recorded as a table.
7. **Build check** — run the site build so malformed MDX never reaches the PR.
8. **Security scan (hard gate)** — the repo is public; even a momentary push of a
   secret is not tolerable. Before any `git push`:
   - The diff vs `trunk` may contain ONLY the expected new blog MDX, the auto-generated
     `app/tag-data.json` tag index, and (if edited) the design/docs files the run
     created. Any other file blocks the push.
   - Pattern scan of the full diff for credentials (AWS/GitHub/OpenAI/Anthropic key
     shapes, `PRIVATE KEY` blocks, `api_key=`/`token=`/`secret=` assignments, `.env`
     content, connection strings with passwords).
   - Use `gitleaks` on the diff when installed.
   - A read-through of the complete diff for anything sensitive that patterns miss
     (internal URLs, private repo names beyond the brief, personal data).
   - Any hit → do not push; report to Jeremy and wait.
9. **PR** — push the branch, `gh pr create` against `trunk` with the audit table and
   disclosure list in the body.

## Anti-hallucination rules

### Claim taxonomy

Every sentence in the draft is one of:

- **Sourced fact** (versions, dates, features, benchmarks, quotes): requires an
  evidence-file entry and an inline link. No evidence → the claim doesn't ship.
- **First-person experience**: must come from the brief. If the brief doesn't cover
  something, ask — never fill in.
- **Opinion/framing**: allowed freely, phrased so it can't be mistaken for fact.

### Source tiers

1. **Primary** — official docs, changelogs, release notes, the project's own repo/blog.
   Required for any specific number, date, or version.
2. **Established tech press** — Ars Technica, The Register, InfoQ, LWN, major
   engineering blogs. Fine for industry context; loses to tier 1 on conflict.
3. **Never for facts** — SEO content farms, AI aggregators, forums/Reddit (usable only
   as explicitly-attributed anecdote).

### Private-repo guardrails (project updates)

- Read only README, commit messages, releases, and issue titles via `gh` — never file
  contents unless the brief names a specific file.
- Nothing outside the brief's scope appears in the draft.
- The PR body lists every private-repo detail disclosed, for line-by-line veto.

## PR body format

1. Post summary
2. Claims-audit table: claim → source URL → verdict
3. Disclosure list (project updates)
4. Notes on anything the audit cut or rewrote
