---
name: optimize-blog
description: Use when Jeremy asks to optimize, refresh, or update an existing blog post for SEO or GEO — e.g. "optimize the tailscale post for SEO", "refresh <slug> for GEO", "update the CSV post for search".
---

# Optimize Blog

## Overview

Retrofit one existing, already-published post in `data/blog/` to meet the SEO/GEO
bar from write-blog — without breaking its URL or its publish history. One post
per run, opens a PR for Jeremy's review, same public-repo security gate as
write-blog.

**REQUIRED BACKGROUND:** the _SEO and GEO requirements_ section of the write-blog
skill (`.claude/skills/write-blog/SKILL.md`) — read it for the actual checklist
(answer-first openings, question-driven headings, self-contained sections,
comparison tables, FAQ, keyword targets, `title`/`summary` character limits).
This skill assumes that checklist and doesn't repeat it.

## Iron rules

1. **The file path never changes.** No redirects exist in `next.config.js` —
   renaming `data/blog/<slug>.mdx` breaks the post's live URL. Restructure and
   rewrite content freely; never `git mv` or recreate the file under a new name.
2. **`date` never changes.** Only `lastmod` moves. Backdating recency is
   dishonest.
3. **No fact without evidence.** Every claim in the retrofitted post, not just
   new additions, gets checked against a source fetched this run (Workflow step 5) — the original post's evidence file is gone or stale, so it doesn't count.
   Drifted facts get corrected, not left stale.
4. **Nothing is pushed until the security gate passes.** No exceptions.

## Workflow (create a TodoWrite item per step)

1. **Preflight** — `gh auth status` succeeds; working tree clean;
   `git fetch origin trunk`. Any failure → stop and tell Jeremy.
2. **Target** — resolve Jeremy's reference to a file in `data/blog/`.
   Ambiguous or not found → list candidates and ask.
3. **Branch** — `git checkout -b blog-optimize/<slug> origin/trunk`.
4. **Gap audit** — read the post and its frontmatter against write-blog's SEO
   and GEO checklist. List what's missing or out of spec (no FAQ, buried lead,
   title over 60 chars, no `lastmod`, no comparison table where one would help,
   etc.). Show Jeremy this list before editing — some gaps are intentional
   (nothing to compare, no natural FAQ), so confirm before restructuring
   around them.
5. **Re-verify → evidence file** — `evidence-<slug>.md` in the scratchpad, same
   source tiers as write-blog (Tier 1 required for any number, date, or
   version). Check every existing factual claim in the post against a current
   source, not just what's being added. Flag drift explicitly: prior value →
   current value → source.
6. **Retrofit** — apply the confirmed gaps and any drift corrections:
   answer-first lead, question-phrased headings, self-contained sections,
   comparison table/FAQ where warranted, keyword coverage, `title`/`summary`
   within length targets, bump `lastmod` to today. File path and `date`
   untouched.
7. **Claims audit** — dispatch a fresh subagent (Agent tool) given the
   retrofitted post, the evidence file, and the original post as ground truth
   — no drafting context. Same verdict table as write-blog (claim → type →
   evidence reference → supported/unsupported), covering the whole post since
   re-verified facts changed too. Rewrite or cut every unsupported claim.
8. **Build check** — `yarn build`. Broken MDX never reaches the PR.
9. **Security gate** — run `bash .claude/skills/write-blog/scan-diff.sh` and
   show its output. Then read the complete `git diff origin/trunk...HEAD`
   yourself. Any finding → do not push; report to Jeremy and wait.
10. **Commit, push, PR** — `gh pr create --base trunk` using the body template
    below.

## PR body template

```markdown
## Summary

<which post, and why it needed optimizing>

## Gaps closed

| Gap | Before | After |
| --- | ------ | ----- |

## Facts re-verified

| Claim | Prior value | Current value | Source |
| ----- | ----------- | ------------- | ------ |

## Claims audit

| Claim | Type | Source | Verdict |
| ----- | ---- | ------ | ------- |

## Cut or rewritten during audit

- <claims that didn't survive, and why>
```

## Rationalizations — all of these mean STOP

| Excuse                                                          | Reality                                                                                    |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| "Renaming the slug is a small cleanup"                          | It's a live URL. Breaking it costs more SEO than the cleanup gains. Never rename the file. |
| "The post's already public, one more edit is low-risk"          | Same repo, same rules. Gate anyway.                                                        |
| "This fact was true when the post was first written"            | That evidence is gone or stale. Re-fetch this run.                                         |
| "The gap audit is obviously right, skip confirming with Jeremy" | Some gaps are intentional. Confirm before restructuring.                                   |

## Red flags — stop and correct course

- `git mv` or a new filename anywhere in the diff
- `date` field changed
- A claim in the retrofitted post with no entry in this run's evidence file
- About to push without scan-diff.sh output in this conversation
