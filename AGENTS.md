# Task completion

Always run the `anoblet-commit` skill after finishing work, before the final response.
Read `.agents/skills/anoblet-commit/SKILL.md` and follow its review, commit, push,
and verification workflow. This standing instruction authorizes committing and
pushing the completed task's reviewed changes without asking again. Preserve
unrelated changes; follow any narrower instructions from the current request.
If there are no changes to publish, report that. If publication is blocked,
report the blocker and do not claim the work was published.

# Design verification

Always use a browser tool when making design decisions. Inspect rendered pages
at desktop and mobile widths, including relevant themes and interaction states.
If the browser tool is unavailable, report that and use Playwright to inspect the
rendered page and screenshots.
