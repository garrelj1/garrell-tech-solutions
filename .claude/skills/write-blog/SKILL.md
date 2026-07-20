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
   Within that constraint, prefer specific numbers, dates, and named examples over
   vague claims — precision is what makes a sentence quotable, not license to add
   anything unsourced.
3. **Nothing is pushed until the security gate passes.** No exceptions.

## SEO and GEO requirements

Applies to every post, both modes. Goal: rank in search _and_ get quoted by
AI answer engines (ChatGPT, Perplexity, Gemini, Google AI Overviews) — both
reward the same thing, a self-contained, well-evidenced answer, so write to
that standard once rather than bolting on separate passes.

- **Answer-first.** Open the post with a 2-4 sentence, self-contained,
  quotable answer to the question implied by the title, then expand. Give each
  major section its own tight lead-in, too — an engine that pulls just that
  section should still get a complete thought.
- **Question-driven headings.** Phrase H2/H3s as real questions a reader would
  type into Google or ask an AI assistant — natural and conversational, not
  keyword strings.
- **Self-contained sections.** Someone landing on one section via search
  should get a complete answer without having read what came before.
- **Comparison table** whenever the post discusses options or alternatives.
- **`## FAQ`** near the end, 3-6 Q&As mirroring real questions, covering ones
  not already fully answered above — not a rehash of prior headings.
- **Keywords naturally, not stuffed:** the focus keyword/topic from the brief
  plus its 3-5 related terms, covered in the body where they fit.
- **`title`** doubles as the SEO title — keep it ≤60 characters where that
  doesn't cost clarity; if it must run longer, say so in the PR summary rather
  than forcing an awkward title.
- **`summary`** doubles as the meta description (it's what actually renders in
  `<meta name="description">` and the OG/Twitter tags — see
  `app/blog/[...slug]/page.tsx`) — keep it ≤155 characters.
- **`lastmod`** — set equal to `date` at first publish. Whenever this post is
  edited later, bump `lastmod` and refresh any stats/dates in the body — the
  post's `dateModified` in JSON-LD reads straight from it, so a stale value
  quietly tells search and AI crawlers the content is older than it is.

## Workflow (create a TodoWrite item per step)

1. **Preflight** — `gh auth status` succeeds; working tree clean;
   `git fetch origin trunk`. Any failure → stop and tell Jeremy.
2. **Brief** — ask Jeremy:
   - tech mode: the technology, his actual experience (benefits, anecdotes, metrics,
     setup), and the angle he wants.
   - update mode: which repo, and exactly what may be disclosed. Treat the answer as
     a whitelist — anything not listed stays private.
   - both modes: the focus keyword/topic plus 3-5 related terms (what someone would
     type into Google or ask an AI assistant to want this post) and, if relevant,
     which garrellts.com service page the post should support. No clear intent →
     pick the most natural one and confirm with Jeremy rather than skipping it.
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
   (`title`, `date`, `lastmod`, `tags`, `draft: false`, `summary`) — see
   _SEO and GEO requirements_ below for what makes a good title, summary, and
   structure. Inline link per sourced fact; `## Sources` list at the end.
   `draft: false` is correct — the PR is the review gate. Include at least one
   inline link to the garrellts.com service page identified in the brief, placed
   where it reads naturally — never bolted on or forced. No relevant service page
   exists → skip and note that in the PR summary rather than inventing a link.
6. **Claims audit** — dispatch a fresh subagent (Agent tool) given ONLY the draft,
   the evidence file, and the brief — no drafting context. It returns a table:
   claim → type (sourced / experience / opinion) → evidence or brief reference →
   verdict (supported / unsupported). Rewrite or cut every unsupported claim.
   Edits added new claims → audit again.
7. **Optimization pack** — once the draft is final, produce for the PR body: an
   SEO title (≤60 chars — reuse frontmatter `title` if it already fits), the meta
   description (≤155 chars — this **is** frontmatter `summary`, not a second
   version of it), the slug, the focus + related keywords and where each appears,
   and 2-4 internal link suggestions (anchor text + target) beyond what's already
   inline, plus a note on any claim that would benefit from an external
   authoritative citation it doesn't have yet. `Article`/`BlogPosting` JSON-LD is
   already generated automatically from frontmatter (see
   `contentlayer.config.ts`) — don't hand-author a duplicate. If the draft has an
   FAQ section, hand-author only its `FAQPage` JSON-LD (answers matching the
   audited draft verbatim) and offer Jeremy the option to embed it under the FAQ
   heading as `<script type="application/ld+json" dangerouslySetInnerHTML={{
__html: JSON.stringify({...}) }} />` — the same pattern already used in
   `app/blog/[...slug]/page.tsx` — with the next step's build check as the
   verification that it compiles.
8. **Build check** — `yarn build`. Broken MDX never reaches the PR.
9. **Security gate** — run `bash .claude/skills/write-blog/scan-diff.sh` and show
   its output. Then read the complete `git diff origin/trunk...HEAD` yourself,
   hunting for what patterns miss: internal URLs, private repo details beyond the
   brief, personal data. Any finding → do not push; report to Jeremy and wait.
10. **Commit, push, PR** — `gh pr create --base trunk` using the body template,
    including the Optimization pack.

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

## Optimization pack

- SEO title:
- Meta description (= frontmatter `summary`):
- Slug:
- Focus keyword:
- Related keywords:
- Internal links suggested:
- External link opportunities:
- `FAQPage` JSON-LD (if the post has an FAQ section):

## Disclosures (update mode)

- <every private-repo detail used>

## Cut or rewritten during audit

- <claims that didn't survive, and why>
```

## Rationalizations — all of these mean STOP

| Excuse                                             | Reality                                                                                              |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| "He said don't bother him with questions"          | That covers trivia, not inventing his experiences. Ask, or leave the section out.                    |
| "This is common knowledge / I know this tool well" | Common knowledge goes stale and models misremember. Fetch a source or cut it.                        |
| "The diff is obviously clean"                      | Run the gate. It takes seconds.                                                                      |
| "It's just one MDX file"                           | It lands in a public repo. Gate anyway.                                                              |
| "An audit subagent is overkill for a short post"   | Short posts hallucinate too. Always audit.                                                           |
| "The source is probably still accurate"            | Probably ≠ evidence. Re-fetch this run.                                                              |
| "This topic doesn't need an FAQ or table"          | Fine if genuinely nothing to compare or ask — say so in the PR summary, don't just drop it silently. |

## Red flags — stop and correct course

- Writing "I / my / me" content that isn't in the brief
- Typing a version number, date, or benchmark with no evidence entry for it
- About to `git push` without scan-diff.sh output in this conversation
- Diff touches any file other than the new MDX (plus docs this run created)
- Citing a URL you never actually fetched this run
- Hand-authoring `Article`/`BlogPosting` JSON-LD instead of trusting frontmatter
- Meta description in the Optimization pack that doesn't match frontmatter `summary` verbatim
