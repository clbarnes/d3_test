#!/bin/bash
DIR=$(git rev-parse --show-toplevel)
ln -s $DIR/hooks/pre-commit $DIR/.git/hooks/pre-commit
ln -s $DIR/hooks/post-commit $DIR/.git/hooks/post-commit