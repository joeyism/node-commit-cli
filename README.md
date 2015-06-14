#Commit-CLI

A simple tool to allow you to easily commit your files.

### Install
In order to install, run

    > npm install -g commit-cli

### To Run
To commit [files] with message [message], simply type

    > commit [files] [message]

If [files] and [message] isn't provided, a prompt will appear for the user to input their values.

##### Run Example

    > commit index.js package.json "First init commit"

#### Commit Message
In order to add current branch into your commit message (useful for JIRA and STASH commits), add *$BR* to your message

##### Commit Message Example
If your current branch is *feature/somefunction*, then

    > commit --all "$BR: added message"

is the same as

    > commit --all "feature/somefunction: added message"

### Version

#### 1.0.0
* First Working 
