Workspace Rules
1. Naming Conventions
Files and folders: lowercase, use hyphens (example: dog-profile-card.tsx, match-service.ts)
Tests mirror file name with .test (example: match-service.test.ts)
Assets: stored under assets/images/ and assets/icons/
Components: use PascalCase (example: DogProfileCard.tsx)
Hooks and utilities: use camelCase (example: useAuth.ts, formatDate.ts)
Branches: short, descriptive names such as:
feature/<summary> → feature/matching-algo
fix/<summary> → fix/chat-scroll-bug
chore/<summary> → chore/update-deps
docs/<summary> → docs/add-prd
2. Commit Message Guidelines
Use Conventional Commits for clarity.
Format: <type>(optional scope): <imperative summary>
Types: feat (new feature), fix (bug fix), docs, style (no logic changes), refactor, test, chore, perf
Examples:
feat(match): add distance + energy filters
fix(chat): prevent duplicate message render
docs: add user stories and task list
Body (optional): explain what changed and why; reference issues if applicable (example: Closes #12).
3. Pull Request and Review Process
Before opening a PR: update branch with main, run lint/tests, ensure build passes, add/modify tests as needed, update documentation.
PR Title: should follow commit style (example: feat(match): initial matching endpoint).
PR Description should include: What, Why, How, Screenshots (if UI), Tests, Risk/Impact.
Review: at least one reviewer required; no self-merges. Reviewers check requirements, readability, tests, edge cases, and security.
Merging: use squash and merge. Squash commit message is PR title. Delete branch after merge.
4. Branching Strategy
Main branch: always stable and deployable, protected.
Use short-lived feature branches; merge small PRs often.
Flow:
Create branch from main (example: git checkout -b feature/match-cards).
Commit with clear messages.
Push and open PR early (drafts are fine).
Address feedback and squash/merge.
Delete branch after merge.
Release tags (optional): mark stable points as v0.1.0, v0.2.0, etc.
5. Definition of Done
A task is “Done” when:
Acceptance criteria in UserStories.md are met.
Code builds with no errors; lint passes.
Tests are updated and passing.
UI is responsive on mobile devices.
No console errors or warnings on key screens.
Documentation is updated (README, PRD, Task List).
6. Environment and Secrets
Never commit secrets. Use .env files (ignored by Git).
Example variables: API base URL, Supabase keys.
Local development uses .env.local. CI uses repository secrets.
Document new environment variables in README.
7. Issue Tracking and Tasks
Create GitHub issues for each task or user story.
Titles may include epic prefix (example: [Match] Add compatibility filters).
Link PRs to issues (Closes #ID).
Labels: feature, bug, docs, good-first-issue.
8. Code Style and Quality
Keep components small and reusable.
Avoid duplication by extracting logic into hooks or utilities.
Ensure accessibility (labels, color contrast, focus states).
Add inline comments only when logic is non-obvious.
9. Local Workflow (Windsurf IDE)
Open repo folder in Windsurf Explorer.
Use Source Control for staging and clear commit messages.
Always pull before starting new work.
Run the app and verify UI on mobile viewport.
10. GitHub Settings (Instructor/Lead)
Protect main: require review and passing checks.
Default to squash merge only.
Delete branches after merge.
Optionally require linear history.