
# Git Practice Guides — Lazygit Project

This file gives you 9 practical guides to drill core Git commands using your existing project.

You already know: `clone`, `init`  
We will focus on:  
`commit`, `add`, `status`, `log`, `branch`, `checkout`, `merge`, `push`, `pull`, `remote`, `diff`, `fetch`, `reset`, `stash`, `config`, `rebase`, `revert`.

---

## 0. Assumptions

- You are inside your repo folder (e.g. `project_lazygit`).
- Repo is already initialized, has at least one commit and a `main` branch.
- A remote like `origin` may or may not exist yet (you will practice this in Guide 4).

---

## Guide 1 — `config` (one‑time sanity check)

**Commands:** `config`

1. See current config (and where it comes from):

   ```bash
   git config --list --show-origin
   ```
   to exit pre "q"

2. Set your global identity (if needed):

   ```bash
   git config --global user.name "Roger Woolie"
   git config --global user.email "youremail@example.com"
   ```

See your glocal identity
```bash
git config user.name
 git config user.email
```

3. Optional: make `main` the default branch name for new repos:

   ```bash
   git config --global init.defaultBranch main
   ```

4. Verify:

   ```bash
   git config user.name
   git config user.email
   ```

---

## Guide 2 — Core loop: `status`, `diff`, `add`, `commit`, `log`

**Commands:** `status`, `diff`, `add`, `commit`, `log`

1. Edit **index.html** (for example, change `Card Satu` to `Card One (Practice)`).

2. Check what changed:

   ```bash
   git status
   git diff
   ```

3. Stage the change:

   ```bash
   git add index.html
   git status
   ```

4. Commit it:

   ```bash
   git commit -m "Change Card Satu title to Card One (Practice)"
   ```

5. Inspect recent history:

   ```bash
   git log --oneline --graph --decorate --max-count=5
   ```

6. Repeat once more with a different file (e.g. **styles.css**) to strengthen the muscle memory.

---

## Guide 3 — Branching basics: `branch`, `checkout`, `merge`

**Commands:** `branch`, `checkout`, `merge`

1. Create a new branch:

   ```bash
   git branch feature/card-layout
   git branch          # list branches
   ```

2. Switch to it:

   ```bash
   git checkout feature/card-layout
   ```

3. Make a visible UI change (card order, spacing, etc.) and save.

4. Commit your work:

   ```bash
   git status
   git add index.html styles.css
   git commit -m "Tweak card layout on feature branch"
   ```

5. Return to `main`:

   ```bash
   git checkout main
   ```

6. Merge the feature branch into `main`:

   ```bash
   git merge feature/card-layout
   ```

7. Delete the merged branch:

   ```bash
   git branch -d feature/card-layout
   ```

8. Optional history view:

   ```bash
   git log --oneline --graph --all --decorate
   ```

---

## Guide 4 — Working with remotes: `remote`, `push`, `pull`, `fetch`

**Commands:** `remote`, `push`, `pull`, `fetch`

1. Check remotes:

   ```bash
   git remote -v
   ```

2. If `origin` is missing, add it (adjust URL):

   ```bash
   git remote add origin git@github.com:mohdazlanabas/practice_git.git
   ```

3. Push `main` for the first time:

   ```bash
   git push -u origin main
   ```

4. Make a small change (e.g. footer text), commit, and push:

   ```bash
   git add .
   git commit -m "Footer tweak for remote practice"
   git push
   ```

5. Practice `fetch` vs `pull`:

   - Make a change directly in GitHub UI on `main`.
   - On your machine:

     ```bash
     git fetch origin
     git log origin/main --oneline --max-count=3
     git pull origin main
     ```

---

## Guide 5 — Safer history edits: `reset` and `revert`

**Commands:** `reset`, `revert`  
*Do this in your practice repo only, not in a shared production repo.*

### 5A. `reset` (soft and mixed)

1. On `main`, make two quick commits:

   ```bash
   # Commit A
   # (Change some text, then:)
   git add index.html
   git commit -m "Practice commit A"

   # Commit B
   # (Another small change:)
   git add index.html
   git commit -m "Practice commit B"
   ```

2. View last three commits:

   ```bash
   git log --oneline --max-count=3
   ```

3. Move `HEAD` back one commit but keep the changes staged:

   ```bash
   git reset --soft HEAD~1
   git status
   ```

4. Move `HEAD` back again but unstage the changes (mixed reset, the default):

   ```bash
   git reset HEAD~1
   git status
   git diff
   ```

### 5B. `revert` (undo with a new commit)

1. Make a commit that obviously changes the UI (e.g. “ugly background color”).

2. Undo that commit:

   ```bash
   git revert HEAD
   ```

3. Check history and confirm that a new “revert” commit appeared:

   ```bash
   git log --oneline --max-count=5
   ```

---

## Guide 6 — Parking work: `stash`

**Commands:** `stash`, `stash list`, `stash pop`

1. On `main`, modify several files (HTML, CSS, JS), but **do not** stage them.

2. Stash your changes:

   ```bash
   git status
   git stash push -m "WIP card animation experiment"
   git status
   git stash list
   ```

3. Switch to another branch (e.g. `main` or a different feature) and poke around.

4. Come back and restore the WIP:

   ```bash
   git checkout main    # if you left main
   git stash pop
   git status
   ```

Optional:  
Create two separate stashes and practice `git stash list`, `git stash show`, and `git stash pop stash@{n}`.

---

## Guide 7 — Getting comfortable with `diff`

**Commands:** `diff`, `diff --staged`

1. Modify `index.html` and `styles.css` but don’t stage anything.

2. See all working tree changes:

   ```bash
   git diff
   ```

3. Stage only one file:

   ```bash
   git add index.html
   git status
   ```

4. Compare the staged vs last commit:

   ```bash
   git diff --staged
   ```

5. Compare remaining unstaged changes:

   ```bash
   git diff
   ```

This trains your eye to read what is staged vs unstaged.

---

## Guide 8 — Basic `rebase` (non‑scary)

**Commands:** `rebase`, plus `branch`, `checkout`, `merge`

1. From `main`, create a feature branch:

   ```bash
   git checkout -b feature/clean-footer
   ```

2. Make 2–3 small commits on this branch (footer text, spacing, color), each as a separate commit.

3. Switch back to `main` and make a different commit (e.g. change the main heading):

   ```bash
   git checkout main
   # edit heading
   git add index.html
   git commit -m "Update main heading text"
   ```

4. Rebase your feature branch onto latest `main`:

   ```bash
   git checkout feature/clean-footer
   git rebase main
   ```

5. If there’s a conflict:

   - Fix it in your editor.
   - Stage the fixed file(s):

     ```bash
     git add <filename>
     ```

   - Continue the rebase:

     ```bash
     git rebase --continue
     ```

6. When rebase finishes, fast‑forward merge:

   ```bash
   git checkout main
   git merge feature/clean-footer
   ```

7. Push the updated history (if remote exists):

   ```bash
   git push
   ```

---

## Guide 9 — History browsing with `log`

**Commands:** various `log` formats

Run these commands after you’ve done a few of the guides above:

```bash
git log --oneline --graph --decorate --all
git log --stat --max-count=3
git log --author="Roger"
git log -- index.html
```

- `--oneline --graph --decorate --all` shows a compact graph of all branches.
- `--stat` shows which files changed and how many lines.
- `--author` filters commits by author.
- `git log -- <path>` filters history for a specific file.

---

## Suggested Daily Practice Flow (10–15 minutes)

1. Pull latest changes:

   ```bash
   git pull
   ```

2. Create a practice branch for the day:

   ```bash
   git checkout -b practice/$(date +%Y-%m-%d)
   ```

3. Make 1–3 small UI or content tweaks.

4. Run the full loop:

   ```bash
   git status
   git diff
   git add .
   git commit -m "Daily practice changes"
   ```

5. Push and merge:

   ```bash
   git push -u origin HEAD
   git checkout main
   git merge practice/$(date +%Y-%m-%d)
   git push
   ```

Use these 9 guides repeatedly until each command feels automatic in your hands.
