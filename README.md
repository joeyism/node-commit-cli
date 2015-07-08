# Commit-CLI
 
[![Build Status](https://travis-ci.org/joeyism/node-commit-cli.svg)](https://travis-ci.org/joeyism/node-commit-cli)

A simple tool to allow you to easily commit your files.

## Install
In order to install, run

    > npm install -g commit-cli

## To Run

### Commit
To commit [files] with message [message], simply type

    > commit [files] -m [message]

If [files] and [message] isn't provided, a prompt will appear for the user to input their values.

**Example**

    > commit index.js package.json -m "First init commit"

### Recommit
To recommit the last message with [new-message], simply type

    > recommit [new-message]

### Commit Message
In order to add current branch into your commit message (useful for JIRA and STASH commits), add *$BR* to your message

**Example**

If your current branch is *feature/somefunction*, then

    > commit --all -m "$BR: added message"

is the same as

    > commit --all -m "feature/somefunction: added message"

Recommit can be done by

    > recommit "$BR: some new message"

### Version
### 2.1.0
* Added functionality of recommit

### 2.0.0
* Modified the way user inputs 

### 1.2.6
* Updated commited files showings

### 1.2.5
* Updated git to show commited files

#### 1.2.4
* Show which files are commited

#### 1.2.0
* Added a check to see if there are files to commit first

#### 1.1.0
* Added ability to variably add branch to commit message

#### 1.0.0
* First Working 
