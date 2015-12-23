#! /bin/bash
branch="${1:?Provide a branch name}"

git fetch --all --prune

if git show-ref --verify --quiet "refs/heads/$branch"; then
    git checkout master
    git pull origin master
    git merge $branch
    git push origin master
    git branch -d $branch
    # git push origin :$branch
else
    echo "Branch does not exist"
    exit 0
fi
