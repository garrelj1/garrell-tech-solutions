---
name: write-blog
description: Use when Jeremy asks for a new blog post, article, announcement, or project update for this site — e.g. "write a post about X", "blog about how I use Y", "post an update on <repo>".
---

# Write Blog

## Overview

Draft grounded blog posts on a fresh branch and open a PR for Jeremy's review.
Core principle: **every sentence is sourced, from Jeremy's brief, or clearly opinion —
nothing from memory.** The GitHub repo is public: nothing is pushed until the security
gate passes. Even a momentary push of a secret is not tolerable.

## Modes

- **tech** — a technology Jeremy uses and how it benefited him
- **update** — project update drawn from one of Jeremy's (possibly private) GitHub repos

## Iron rules

1. **Never invent Jeremy's experience.** First-person claims (habits, anecdotes,
   metrics, configs, pain points) come only from his brief. Brief doesn't cover it →
   STOP and ask. "He said don't bother him" is not a license to fabricate his life;
   a fabricated post costs him more than a question does.
2. **No fact without evidence.** Every version, date, feature, benchmark, or quote
   must exist in this run's evidence file and carry an inline link in the prose.
   No source found → cut the claim. Never write it from memory, however confident.
3. **Nothing is pushed until the security gate passes.** No exceptions.

## Workflow (create a TodoWrite item per step)

1. **Preflight** — `gh auth status` succeeds; working tree clean;
   `git fetch origin trunk`. Any failure → stop and tell Jeremy.
2. **Brief** — ask Jeremy:
   - tech mode: the technology, his actual experience (benefits, anecdotes, metrics,
     setup), and the angle he wants.
   - update mode: which repo, and exactly what may be disclosed. Treat the answer as
     a whitelist — anything not listed stays private.
3. **Branch** — `git checkout -b blog/<slug> origin/trunk`.
4. **Research → evidence file** — log every source to `evidence-<slug>.md` in the
   scratchpad: URL, access date, exact excerpts relied on. Tiers:
   - **Tier 1** (required for any number, date, or version): official docs,
     changelogs, release notes, the project's own repo/blog.
   - **Tier 2** (context only; loses to tier 1 on conflict): established tech press —
     Ars Technica, The Register, InfoQ, LWN, major engineering blogs.
   - **Never for facts**: SEO farms, AI aggregators, forums/Reddit (explicitly
     attributed anecdote only).
   - update mode: read only README, commit messages, releases, and issue titles via
     `gh`; file contents only when the brief names the file. Log every private
     detail used under a `## Disclosures` heading in the evidence file.
5. **Draft** — `data/blog/<slug>.mdx`. Frontmatter matches existing posts
   (`title`, `date`, `tags`, `draft: false`, `summary`). Inline link per sourced
   fact; `## Sources` list at the end. `draft: false` is correct — the PR is the
   review gate.
6. **Claims audit** — dispatch a fresh subagent (Agent tool) given ONLY the draft,
   the evidence file, and the brief — no drafting context. It returns a table:
   claim → type (sourced / experience / opinion) → evidence or brief reference →
   verdict (supported / unsupported). Rewrite or cut every unsupported claim.
   Edits added new claims → audit again.
7. **Build check** — `yarn build`. Broken MDX never reaches the PR.
8. **Security gate** — run `bash .claude/skills/write-blog/scan-diff.sh` and show
   its output. Then read the complete `git diff origin/trunk...HEAD` yourself,
   hunting for what patterns miss: internal URLs, private repo details beyond the
   brief, personal data. Any finding → do not push; report to Jeremy and wait.
9. **Commit, push, PR** — `gh pr create --base trunk` using the body template.

## Voice and style

Semi-professional: an engineer writing plainly for peers, first person, contractions
fine. Concrete beats abstract. Vary sentence length.

- **No emoji.** Anywhere, including headings and the PR body.
- **Em-dashes: one per post at most.** Use commas, periods, or parentheses instead.
- **Avoid AI tells**: "delve", "dive into", "game-changer", "seamless(ly)",
  "supercharge", "In today's fast-paced world", "It's important to note",
  "isn't just X, it's Y" constructions, stacked rule-of-three sentences,
  a "Conclusion" heading that restates the whole post, and hedging filler.
- Prefer short declarative sentences over subordinate-clause pileups. Read the
  draft aloud in your head; anything that sounds like marketing copy gets cut.

## PR body template

```markdown
## Summary

<what the post covers and why>

## Claims audit

| Claim | Type | Source | Verdict |
| ----- | ---- | ------ | ------- |

## Disclosures (update mode)

- <every private-repo detail used>

## Cut or rewritten during audit

- <claims that didn't survive, and why>
```

## Rationalizations — all of these mean STOP

| Excuse                                             | Reality                                                                           |
| -------------------------------------------------- | --------------------------------------------------------------------------------- |
| "He said don't bother him with questions"          | That covers trivia, not inventing his experiences. Ask, or leave the section out. |
| "This is common knowledge / I know this tool well" | Common knowledge goes stale and models misremember. Fetch a source or cut it.     |
| "The diff is obviously clean"                      | Run the gate. It takes seconds.                                                   |
| "It's just one MDX file"                           | It lands in a public repo. Gate anyway.                                           |
| "An audit subagent is overkill for a short post"   | Short posts hallucinate too. Always audit.                                        |
| "The source is probably still accurate"            | Probably ≠ evidence. Re-fetch this run.                                           |

## Red flags — stop and correct course

- Writing "I / my / me" content that isn't in the brief
- Typing a version number, date, or benchmark with no evidence entry for it
- About to `git push` without scan-diff.sh output in this conversation
- Diff touches any file other than the new MDX (plus docs this run created)
- Citing a URL you never actually fetched this run
